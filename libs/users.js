import clientPromise from '../libs/client'

let client
let db
let users

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db()
        users = await db.collection('users')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}

/////////////
/// USERS ///
/////////////

export async function findUserById(userId) {
    try {
        if (!users) await init();

        const user = await users.findOne({ id: userId });

        if (!user) throw new Error('User not found.');

        return { user: { ...user, id: user.id.toString() }, isAdmin: user.role === 'admin' };
    } catch (error) {
        return { error: 'Failed to find the user.' };
    }
}


export async function findUserByEmail(email) {
    try {
        if (!users) await init(); // Initialize MongoDB connection if not already initialized

        const user = await users.findOne({ email });

        if (!user) throw new Error('User not found.');

        return { user: { ...user, _id: user._id.toString() }, isAdmin: user.role === 'admin' };
    } catch (error) {
        return { error: 'Failed to find the user.' };
    }
}


export async function updateUser(email, update) {
    try {
        if (!users) await init()

        await users.updateOne({ email }, { $set: update })

        return { success: true }
    } catch (error) {
        return { error: 'Failed to reset the password.' }
    }
}