import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import User from "../../../../models/user";


// PUT request to update the status of a user
export async function PUT(request, { params }) {
    const { id } = params;
    const { newStatus } = await request.json(); // Extract the new status from the request body
    await connectMongoDB();
    const updatedUser = await User.findByIdAndUpdate(id, { status_inquiry: newStatus }, { new: true });
    if (!updatedUser) {
        return NextResponse.json({ message: "No user found with the provided ID" }, { status: 404 });
    }
    return NextResponse.json({ message: "User updated", updatedUser }, { status: 200 });
}

// POST request to create a new user
export async function POST(request) {
    try {
        const user = await request.json(); // Extract the user from the request body
        await connectMongoDB();
        const newUser = await User.create(user);
        return NextResponse.json({ message: "User created", newUser }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}

// GET request to retrieve a specific user
export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({ id }); // Use id field to query
    if (!user) {
        return NextResponse.json({ message: "No user found with the provided ID" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
}

// DELETE request to delete a specific user
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();

        const user = await User.findOne({ id }); // Use id field to query
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const deletedUser = await User.findOneAndDelete({ id }); // Use id field to query
        if (!deletedUser) {
            return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
        }

        return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
    }
}

