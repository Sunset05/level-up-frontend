import React, { useState } from 'react'

export default function DirectMessages({ receivedMessages, sentMessages }) {

    const [chatMessage, setChatMessage] = useState('')

    const userChat = [...receivedMessages, ...sentMessages].flat()
    // const sortedChat =  userChat.sort((message1,message2) => message2.created_at.date() - message1.created_at.date() )
    // console.log(sortedChat)
    
    const renderChat = userChat.map(message => {
        return (
            <p className="chat-bubble">{message.message_body}</p>
        )
    })

    const handleSendMessage = (event) => {
        event.preventDefault()
        fetch("http://localhost:9000/messages", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: {
                    receiver: sentMessages[0].receiver,
                    message_body: chatMessage,
                    has_been_read: false
                }
            })
        })
        .then(response => response.json())
        .then(console.log)
    }

    const handleChange = ({target}) => {
        setChatMessage(target.value)
    }




    return (
        <>
            <div className="chat-container">
                {renderChat}
            </div>

            <div className="chat-entry-container" onSubmit={handleSendMessage}>
                <form className="form" >
                <label>
                    <input type='text' value={ chatMessage } onChange={handleChange} />
                </label>
                    <button type='submit'>Send</button>
                </form>
            </div>
        </>
    )
}

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
