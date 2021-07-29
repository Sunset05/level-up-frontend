import React, { Component } from 'react'
import Message from './Message'

export default class MessagesPanel extends Component {
    render() {

        let list = <div className="no-content-message">There is no message to show</div>;
        if (this.props.channel && this.props.channel.messages) {
            return list = this.props.channel.messages.map(message => {
                <Message key={message.id} id={message.id} sendername={message.senderName} text={message.text}>);</Message>
            }) 
        }
        return (
            <div>
                
            </div>
        )
    }
}
