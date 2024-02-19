import {DefaultSession} from "next-auth";

export default function UserCard({user}: {user: DefaultSession["user"]}) {
    return (
        <div>
            <h1>Admin Page</h1>
            <p>Current Logged In User</p>
            <h5>User name : {user?.name}</h5>
            <h5>User email : {user?.email}</h5>

        </div>
    );
}
