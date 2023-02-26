import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.users.fetchAll();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
        );
    };

    const handleToggleBookMark = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Users
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
                users={users}
            />
        </div>
    );
}

export default App;
