import React, { useState, useEffect } from "react"
import DirectMessages from "./DirectMessages"

export default function Messages({ match, location, user, addNewMessage }) {

    return (
        <div className="message-page-container">
            <div className="message-sender-container">
                <h1>chatting with { match.params.author }</h1>
            </div>

            <div className="direct-message-container">
                <DirectMessages 
                    chattingWithId={ location.state.authorId }
                    user={ user }
                    sentMessages= { user.sent_messages } 
                    receivedMessages={ user.received_messages }
                    addNewMessage= { addNewMessage }
                />
            </div>
        </div> 
    )
}