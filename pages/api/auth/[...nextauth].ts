import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Check if environment variables are defined, otherwise provide default values or display an error message
const clientId = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

if (!clientId || !clientSecret) {
    throw new Error('Google client ID or client secret is not defined in environment variables');
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: clientId,
            clientSecret: clientSecret
        })
    ]
});
