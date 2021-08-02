import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile({user}) {

    const renderListings = () => {

        return user.listings?.map(listing => {
            return (
                <div key={listing.id} className='listing-card'>
                    <div className='listing-content-left'>
                        <h3 className="listing-title">{listing.item}</h3>
                        <img src={listing.image_url} alt='image'/>
                    </div>
                    <div className='listing-content-right'>
                        <p className="asking-price">Asking-Price: <span>${listing.price}</span></p>
                        <p>{listing.description}</p>
                    </div>
                </div>
            )
        })
    }   

    return (
        <div className='profile-page-container'>
            <div className='profile-info-container'>
                <h1>{user.username}</h1>
                <Link to='profile/new' className="profile-selection-Link">new listing</Link>
                <Link to='profile/messages' className="profile-selection-Link">messages</Link>
            </div>

            <div className='user-listings-container'>
                {renderListings()}
            </div>

        </div> 
        
    )
}
