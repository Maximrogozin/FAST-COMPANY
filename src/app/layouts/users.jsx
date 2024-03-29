import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditForm from "../components/ui/editForm";

const Users = () => {
    const params = useParams();
    const { userId, editForm } = params;
    return (
        <>
            {userId ? (
                editForm ? (
                    <>
                        <EditForm userId={userId} />
                    </>
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
