import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='header'>
            <div className='inner-header'>
            <div className="logo-container">
                <h1>MY<span>Site</span></h1>
            </div>
            <ul className='navigation'>
        
                <Link to="/">
                <li>Home</li>
                </Link>

                <Link to="/trade/">
                <li>Trade</li>
                </Link>

                <Link to="/contact/">
                <li>Contact</li>
                </Link>

            </ul>
            </div>
        </div>
    )
}
