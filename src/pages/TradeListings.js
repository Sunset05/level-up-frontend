import React from 'react'

export default function TradeListings({listings}) {

    const renderTradeListings = () => listings.map(listing => {
        return (
            <div className="listing-card">
                <h2>{listing.item}</h2>
                <h3>{listing.price}</h3>
                <p>{listing.description}</p>
            </div>
        )
    })

    return (
        <div className="trade-listings-container">
            {renderTradeListings()}
        </div>
    )
}
