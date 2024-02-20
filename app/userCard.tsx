import {DefaultSession} from "next-auth";
import type {User} from "next-auth";

type Props = {
    user: User
}

export default function UserCard({ user}: Props) {
    return (
        <div>
            <h1>Admin Page</h1>
            <p>Current Logged In User</p>
            <h5>User name : {user?.name}</h5>
            <h5>User email : {user?.email}</h5>
            <img src={user?.image} alt="user image"/>
            <h5>User role : {user?.role}</h5>
            <h5>User id : {user?.id}</h5>

        </div>
    );
}