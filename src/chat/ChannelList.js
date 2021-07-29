import React, { Component } from 'react';
import  Channel  from './Channel';

export default class ChannelList extends Component {

    render() {
        let list = 'There is no channels to show';
        if (this.props.channels) {
            list = this.props.channels.map( channel => <Channel key={channel.id} id={channel.id} name={channel.name} participants={channel.participants} ></Channel> )
        }
        return (
            <div>
                {list}
            </div>
        )
    }
}
