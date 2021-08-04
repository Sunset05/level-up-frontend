import React, { useState, useEffect} from 'react'
import DirectMessages from './DirectMessages'


export default function Messages(props) {



    return (
        <div className='message-page-container'>
            
            <div className='message-sender-container'>
                <h1>chatting with {props.match.params.author}</h1>
            </div>

            <div className='direct-message-container'>
                <DirectMessages 
                    chattingWithId={props.location.state.authorId}
                    user={props.user}
                    sentMessages={props.user.sent_messages} 
                    receivedMessages={props.user.received_messages}
                    addNewMessage={props.addNewMessage}
                />
            </div>
            
            

        </div> 
    )
}