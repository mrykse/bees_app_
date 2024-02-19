'use client';
import {useSession, signIn, signOut} from "next-auth/react";
import {Button} from "@nextui-org/button";
import UserCard from "@/app/userCard";
export default function Login() {
    const {data: session} = useSession();
    if (session) {
        return (
            <div>
                <Button onClick={()=> signOut()}>Sign Out of Google</Button>
                <UserCard user={session?.user}/>
            </div>
        )
    } else {
        return (
            <div>
                <Button onClick={()=> signIn("google")}>Sign in with Google</Button>
            </div>
        )
    }
}