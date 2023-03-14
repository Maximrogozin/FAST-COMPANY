import { useParams } from "react-router-dom";
import User from "./user";
import React from "react";
import Users from "./users";

const UsersList = () => {
    const params = useParams();

    const { usersId } = params;

    // eslint-disable-next-line react/react-in-jsx-scope
    return <>{usersId ? <User id={usersId} /> : <Users />}</>;
};

export default UsersList;
