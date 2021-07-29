import React from 'react'
import socketClient  from "socket.io-client";
import Chat from '../chat/Chat';

const SERVER = "http://localhost:8080";

export default function Messages() {

    var socket = socketClient (SERVER);
    socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
});

    return (
        <div className='messages-container'>
            <Chat></Chat>
        </div>
    )
}
