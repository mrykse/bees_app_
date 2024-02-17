import intervention from "../../../models/intervention";
import connectMongoDB from "../../../libs/mongodb";
import {NextResponse} from "next/server";
import Intervention from "../../../models/intervention";

export async function POST(request) {
    const { nom, prenom, email, telephone, adresse_postale, message, inquiry_type, status_inquiry } = await request.json();
    try {
        await connectMongoDB();
        await intervention.create({ nom, prenom, email, telephone, adresse_postale, message, inquiry_type, status_inquiry });
        //return the intervention object elements
        return NextResponse.json({message: 'Intervention enregistrée avec succès',intervention}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: 'Erreur lors de l\'enregistrement de l\'intervention'}, {status: 500});
    }
}

export async function GET() {
    await connectMongoDB();
    const interventions = await Intervention.find();
    return NextResponse.json({interventions})
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Intervention.findByIdAndDelete(id);
    return NextResponse.json({ message: "Intervention deleted" }, { status: 200 });
}
