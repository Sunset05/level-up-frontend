import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
    return (
        <div className='header'>
            <div className='inner-header'>
            <div className="logo-container">
                <h1>Level<span>Up</span></h1>
            </div>
            {props.user.username
                ? <p>Welcome back {props.user.username}!</p>
                : null
            }
            <ul className='navigation'>
        
                <Link to="/">
                <li>Profile</li>
                </Link>

                <Link to="/trade/">
                <li>Trade</li>
                </Link>

                <Link to="/signup">
                <li>Logout</li>
                </Link>


            </ul>
            </div>
        </div>
    )
}
