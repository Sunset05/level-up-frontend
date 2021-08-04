import React, { useState, useEffect} from 'react'
import DirectMessages from './DirectMessages'


export default function Messages(props) {



    return (
        <div className='message-page-container'>
            
            <div className='message-sender-container'>
                <h1>chatting with stacey</h1>
            </div>

            <div className='direct-message-container'>
                <DirectMessages 
                    sentMessages={props.user.sent_messages} 
                    receivedMessages={props.user.received_messages}
                    addNewMessage={props.addNewMessage}
                />
            </div>
            
            

        </div> 
    )
}

{/* <div className='profile-info-container'>
    <h1>{user.username}</h1>
    <Link to='profile/new' className="profile-selection-Link">new listing</Link>
    <Link to='profile/messages' className="profile-selection-Link">messages</Link>
</div>

<div className='user-listings-container'>
    {renderListings()}
</div> */}

{/* <div key={listing.id} className='listing-card'>
                    <div className='listing-content-left'>
                        <h3 className="listing-title">{listing.item}</h3>
                        <img src={listing.image_url} alt='image'/>
                    </div>
                    <div className='listing-content-right'>
                        <p className="asking-price">Asking-Price: <span>${listing.price}</span></p>
                        <p>{listing.description}</p>
                    </div>
                </div> */}