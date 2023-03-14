import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import PropTypes from "prop-types";

const User = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState({});
    console.log(id);

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, [id]);

    const handleAllUsers = () => {
        history.replace("/users");
    };

    return (
        <div>
            {user ? (
                <>
                    <h1>{user.name}</h1>
                    {user.profession && (
                        <h1>Профессия: {user.profession.name}</h1>
                    )}
                    <div>
                        {user.qualities?.map((qual) => (
                            <span
                                key={qual._id}
                                className={"badge m-1 bg-" + qual.color}
                            >
                                {qual.name}
                            </span>
                        ))}
                    </div>
                    <span>completedMeetings: {user.completedMeetings}</span>
                    <h1>Rate: {user.rate}</h1>
                    <button onClick={handleAllUsers}>Все пользователи</button>
                </>
            ) : (
                <>
                    <h2>loading...</h2>
                    <button onClick={handleAllUsers}>Все пользователи</button>
                </>
            )}
        </div>
    );
};
User.propTypes = {
    id: PropTypes.string
};

export default User;
