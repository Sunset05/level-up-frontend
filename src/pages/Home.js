import React from 'react'
import Form from '../components/Form'
import TradeListings from '../pages/TradeListings'

export default function Home(props) {
    return (
        <div>
            <Form submitAction={props.createListing}/>
            <TradeListings listings={props.listings}/>
        </div>
    )
}
