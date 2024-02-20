import {DefaultSession} from "next-auth";
import Login from "@/app/Login";
import ClientPage from "@/app/Login";

export default function AdminPage() {
    return (
        <div>
            <h1>Admin Page</h1>
            <Login/>
        </div>
    );
}
