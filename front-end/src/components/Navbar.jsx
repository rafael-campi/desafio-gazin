import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav-home">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/nivel">Niveis</Link>
                </li>
                <li>
                    <Link to="/desenvolvedores">Desenvolvedores</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;