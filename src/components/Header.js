import React from 'react'

export default function Header() {
    return (
        <div className='header'>
            <div className='inner-header'>
            <div className="logo-container">
                <h1>MY<span>Site</span></h1>
            </div>
            <ul className='navigation'>
                <a><li>Home</li></a>
                <a><li>Tech-Trading</li></a>
                <a><li>Contact</li></a>
            </ul>
            </div>
        </div>
    )
}
