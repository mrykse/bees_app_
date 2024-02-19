import {DefaultSession} from "next-auth";
import Login from "@/app/Login";

export default function AdminPage() {
    return (
        <div>
           <Login/>
        </div>
    );
}
