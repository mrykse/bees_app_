import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Intervention from "../../../../models/intervention";

// PUT request to update the status of an intervention
export async function PUT(request, { params }) {
    const { id } = params;
    const { newStatus } = await request.json(); // Extract the new status from the request body
    await connectMongoDB();
    const updatedIntervention = await Intervention.findByIdAndUpdate(id, { status_inquiry: newStatus }, { new: true });
    if (!updatedIntervention) {
        return NextResponse.json({ message: "No intervention found with the provided ID" }, { status: 404 });
    }
    return NextResponse.json({ message: "Intervention updated", updatedIntervention }, { status: 200 });
}

// GET request to retrieve a specific intervention
export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const intervention = await Intervention.findOne({ _id: id }); // Use _id instead of id
    if (!intervention) {
        return NextResponse.json({ message: "No intervention found with the provided ID" }, { status: 404 });
    }
    return NextResponse.json({ intervention }, { status: 200 });
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();

        const intervention = await Intervention.findOne({ _id: id }); // Use _id instead of id
        if (!intervention) {
            return NextResponse.json({ message: "Intervention not found" }, { status: 404 });
        }

        const deletedIntervention = await Intervention.findByIdAndDelete(id);
        if (!deletedIntervention) {
            return NextResponse.json({ message: "Error deleting intervention" }, { status: 500 });
        }

        return NextResponse.json({ message: "Intervention deleted" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting intervention:', error);
        return NextResponse.json({ message: 'Error deleting intervention' }, { status: 500 });
    }
}

