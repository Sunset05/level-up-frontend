import React, { useState } from "react"

export default function DirectMessages({ user, receivedMessages, sentMessages, addNewMessage, chattingWithId }) {

    const [chatMessage, setChatMessage] = useState("")

    const chattingWithReceivedMessages = receivedMessages.filter(message => message.sender === chattingWithId)
    const chattingWithSentMessages = sentMessages.filter(message => message.receiver === chattingWithId)


    const userChat = [...chattingWithReceivedMessages, ...chattingWithSentMessages];
    const sortedChat =  userChat.sort( (a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateA - dateB
    })

    const renderChat = sortedChat.map(message => {
        return (
            message.receiver_info 
            ?   <div key={message.id} className="sender-chat-container">
                    <p className="sender-author-p" >{ user.username }</p>
                    <p className="sender-chat-bubble" >{ message.message_body }</p>
                </div>
            :   <div key={message.id} className="receiver-chat-container">
                    <p className="receiver-author-p" >{ message.sender_info[0].username }</p>
                    <p className="receiver-chat-bubble">{ message.message_body }</p>
                </div>
        )
    })

    const handleSendMessage = (event) => {
        event.preventDefault()
        const message = {
            receiver: chattingWithId,
            message_body: chatMessage,
            has_been_read: false
        }
        fetch("http://localhost:9000/messages", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message})
        })
            .then(response => response.json())
            .then(message => {
                message.receiver_info = []
                addNewMessage(message)
            })
            setChatMessage("")
}

    const handleChange = ({target}) => {
        setChatMessage(target.value)
    }

    return (
        <>
            <div className="chat-container">
                { renderChat }
            </div>

            <div className="chat-entry-container" onSubmit={ handleSendMessage }>
                <form className="chat-input-form" >
                <label className="chat-input-label">
                    <input 
                        className="message-input" 
                        type="text" 
                        value={ chatMessage } 
                        onChange={ handleChange } 
                    />
                </label>
                <button type="submit" className="chat-send-button">Send</button>
                </form>
            </div>
        </>
    )
}
