import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="nav">
            <Link className="nav-link" to="/">
                Main
            </Link>

            <Link className="nav-link" to="/login">
                Login
            </Link>

            <Link className="nav-link" to="/users">
                Users
            </Link>
        </div>
    );
};

export default NavBar;
