import React from "react"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <div className="header">
            <div className="inner-header">
                <div className="logo-container"></div>

                <ul className="navigation">            
                    <Link to="/">
                        <li className="navbar-link">Profile</li>
                    </Link>

                    <Link to="/trade/">
                        <li className="navbar-link">Trade</li>
                    </Link>

                    <Link to="/signup">
                        <li className="navbar-link">Logout</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}
