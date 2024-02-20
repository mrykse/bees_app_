import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { MongoClient } from 'mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile: GoogleProfile) {
                console.log(profile);
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: "user" // Set the default role to "user"
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = user.role
                token.sub = user.id
            }

            if (trigger === 'update' && session?.name) {
                token.name = session.name
            }

            return token
        },
        async session({ session, token }) {
            if (token && token.sub) {
                const client = new MongoClient(process.env.MONGODB_URI as string, {
                    // useNewUrlParser and useUnifiedTopology are not needed in newer MongoDB drivers
                });

                try {
                    await client.connect();
                    const db = client.db('bees_app_db' as string);
                    const collection = db.collection('users');

                    const existingUser = await collection.findOne({ id: token.sub });
                    if (!existingUser) {
                        // User doesn't exist, add it to the database
                        await collection.insertOne({
                            id: token.sub,
                            name: token.name || '',
                            email: token.email || '',
                            image: token.picture || '',
                            role: token.role || 'user'
                        });
                    }
                } catch (error) {
                    console.error('Error during MongoDB operation:', error);
                } finally {
                    await client.close();
                }
            }

            session.user.role = token.role
            session.user.id = token.sub || ''
            return session
        }
    },
    session: {
        strategy: 'jwt'
    }
});
