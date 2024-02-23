import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMongo, IRateLimiterMongoOptions } from 'rate-limiter-flexible';
import { MongoClient } from 'mongodb';

const mongoOpts = {
    uri: process.env.MONGODB_URI ?? '' as string, // Type assertion here
    dbName: 'rate-limiter'
};

let mongoClient: MongoClient | null = null; // Initialize with null

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

const limiterOptions: IRateLimiterMongoOptions = {
    storeClient: mongoClient!, // Use ! to assert non-null since it will be assigned in connectToMongo
    dbName: mongoOpts.dbName,
    keyPrefix: 'middleware',
    points: 3, // 3 requests
    duration: 60, // per 60 seconds
};

const limiter = new RateLimiterMongo(limiterOptions);

export const rateLimitMiddleware = async (req: NextRequest, res: NextResponse) => {
    try {
        const ipAddress = req.nextUrl.hostname; // Get IP address from nextUrl
        await limiter.consume(ipAddress); // Use the IP address obtained
    } catch (e) {
        console.error('Rate limiter error:', e);
        //res.status(429).send('Too Many Requests'); // Corrected to use res.status and res.send
    }
};

export default rateLimitMiddleware;
