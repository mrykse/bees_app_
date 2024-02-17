import connectMongoDB from "../../../libs/mongodb";
import {NextResponse} from "next/server";
import Intervention from "../../../models/intervention";

export async function POST(request) {
    const { nom, prenom, email, telephone, adresse_postale, message, inquiry_type, status_inquiry } = await request.json();
    try {
        await connectMongoDB();

        // Check if the data already exists
        const existingIntervention = await Intervention.findOne({ nom, prenom, email, telephone, adresse_postale, message, inquiry_type, status_inquiry });

        if (existingIntervention) {
            // If the data already exists, return a 404 error
            return new Response('Data existe déjà', { status: 404 });
        }

        // If the data does not exist, create a new entry
        await Intervention.create({ nom, prenom, email, telephone, adresse_postale, message, inquiry_type, status_inquiry });

        // Return a success message
        return new Response('Intervention enregistrée avec succès', { status: 201 });
    } catch (error) {
        // Return a 500 error if there's any other error
        return new Response('Erreur lors de l\'enregistrement de l\'intervention', { status: 500 });
    }
}


export async function GET() {
    await connectMongoDB();
    const interventions = await Intervention.find();
    return NextResponse.json({interventions})
}

