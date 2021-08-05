import React from "react"
import { Link } from "react-router-dom"

export default function TradeListings({ listings, userId }) {

    const otherUserListings = listings.filter(listing => listing.id !== userId)
    const renderTradeListings = () => {
        return otherUserListings.map(listing => {
            return (
                <div key={ listing.id } className="listing-card">
                    <div className="listing-content-left">
                        <h5>Posted By: { listing.author }</h5>
                        <h3 className="listing-title">{ listing.item }</h3>
                        <img src={ listing.image_url } alt="image"/>
                        <Link 
                            to={{
                                pathname: `/profile/messages/${ listing.author }`,
                                state: { authorId: listing.userId }
                            }}
                        >
                            <li className="trade-listing-message-link">Message { listing.author }</li>
                        </Link>
                    </div>
                    <div className="listing-content-right">
                        <p className="asking-price">Asking-Price: <span>${ listing.price }</span></p>
                        <p>{ listing.description }</p>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className="trade-listings-container">
            {renderTradeListings()}
        </div>
    )
}
