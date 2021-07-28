import React, { useState } from 'react'

import TradeListings from './TradeListings'
import Form from '../components/Form'
import Messages from '../components/Messages'
import { Link } from 'react-router-dom'

// import TradeListings from '../pages/TradeListings'

export default function Profile({submitAction, listings}) {

    return (
        <div className="profile-page-container">
            <div className="profile-info-container">
                <h1>Username</h1>
                <Link to='profile/new' >new listing</Link>
                <Link to='profile/messages'>messages</Link>
            </div>

            <div className="user-listings-container">
                
            </div>

        </div> 
        
    )
}
