import React from 'react'
import Form from '../components/Form'
// import TradeListings from '../pages/TradeListings'

export default function Home({submitAction, listings}) {
    return (
        <div>
        
            <Form submitAction={submitAction}/>
            {/* <TradeListings listings={listings}/> */}
        </div>
    )
}
