import React, { useState } from 'react'

export default function DirectMessages({ receivedMessages, sentMessages, addNewMessage }) {

    const [chatMessage, setChatMessage] = useState('')

    const userChat = [...receivedMessages, ...sentMessages]
    const sortedChat =  userChat.sort( (a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateA - dateB
    } )
    
    
    const renderChat = sortedChat.map(message => {
        console.log(message)
        return (
            message.receiver_info 
            ? <p className="sender-chat-bubble" >{message.message_body}</p>
            : <p className="receiver-chat-bubble">{message.message_body}</p>
        )
    })

    const handleSendMessage = (event) => {
        event.preventDefault()
        const message = {
            receiver: sentMessages[0].receiver,
                    message_body: chatMessage,
                    has_been_read: false
        }
        fetch("http://localhost:9000/messages", {
            method: 'POST',
            headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({message})
        })
            .then(response => response.json())
            .then(message => addNewMessage(message))
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
                <form className="chat-input-form" >
                <label>
                    <input type='text' value={ chatMessage } onChange={handleChange} />
                </label>
                    <div>
                        <button type='submit' className="chat-send-button">Send</button>
                    </div>
                </form>
            </div>
        </>
    )
}
