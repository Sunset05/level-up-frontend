import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile({user}) {

    const renderListings = () => {

        return user.listings?.map(listing => {
            return (
                <div className='listing-card'>
                    <h3>{listing.item}</h3>
                    <img src={listing.image_url} alt={`${listing.item} `}/>
                    <p>{listing.price}</p>
                    <p>{listing.description}</p>
                </div>
            )
        })
    }   

    return (
        <div className='profile-page-container'>
            <div className='profile-info-container'>
                <h1>Username</h1>
                <Link to='profile/new'>new listing</Link>
                <Link to='profile/messages'>messages</Link>
            </div>

            <div className='user-listings-container'>
                {renderListings()}
            </div>

        </div> 
        
    )
}