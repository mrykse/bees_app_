import connectMongoDB from "../../../libs/mongodb";
import Intervention from "../../../models/intervention";
import {NextResponse} from "next/server";

const RateLimiterMongo = require('rate-limiter-flexible').RateLimiterMongo;
const MongoClient = require('mongodb').MongoClient;

const mongoOpts = {
    uri: process.env.MONGODB_URI || '', // Removed type assertion
    dbName: 'rate-limiter'
};

let mongoClient = null; // Removed type annotation

// Function to establish MongoDB connection
const connectToMongo = async () => {
    try {
        mongoClient = new MongoClient(mongoOpts.uri);
        await mongoClient.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow error to handle it where connectToMongo is called
    }
};

// Call connectToMongo to establish MongoDB connection
connectToMongo();

const limiterOptions = {
    storeClient: mongoClient, // Removed non-null assertion
    dbName: mongoOpts.dbName,
    keyPrefix: 'middleware',
    points: 3, // 3 requests
    duration: 60, // per 60 seconds
};

const limiter = new RateLimiterMongo(limiterOptions);

export async function POST(request) {
    const { nom, prenom, email, telephone, adresse_postale, message, inquiry_type, status_inquiry } = await request.json();
    try {
        const ipAddress = request.nextUrl.hostname; // Get IP address from nextUrl
        await limiter.consume(ipAddress); // Use the IP address obtained

        await connectMongoDB();

        // Check if the data already exists
        const existingIntervention = await Intervention.findOne({ prenom, nom, email, telephone, adresse_postale, message, inquiry_type, status_inquiry });

        if (existingIntervention) {
            // If the data already exists, return a 404 error
            return new Response('Data existe déjà', { status: 404 });
        }

        // If the data does not exist, create a new entry
        await Intervention.create({ prenom, nom, email, telephone, adresse_postale, message, inquiry_type, status_inquiry });

        // Return a success message
        return new Response('Intervention enregistrée avec succès', { status: 201 });
    } catch (error) {
        if (error.remainingPoints === 0) {
            // If the error is from rate limiter, return a 429 error
            return new Response('Too Many Requests', { status: 429 });
        }
        // Return a 500 error if there's any other error
        return new Response('Erreur lors de l\'enregistrement de l\'intervention', { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB();
    const interventions = await Intervention.find();
    return NextResponse.json({interventions})
}