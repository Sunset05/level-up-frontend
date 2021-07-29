import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        return (
            <div classname="message-item">
            ‍
                <div><b>{this.props.senderName}</b></div>
            ‍
                <span>{this.props.text}</span>
            </div>
        )
    }
}
