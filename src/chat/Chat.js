import React from 'react';
import  ChannelList  from './ChannelList';
import './chat.css';
import MessagesPanel from './MessagesPanel';

export default class Chat extends React.Component {
    
    state = {
        channels: [{ id: 1, name: 'first', participants:10 }]
    }
    componentDidMount(){
        this.loadChannels()
    }
    loadChannels = async () => {
        fetch('http://localhost:8080/getChannels')
        .then(async response => {
            let data = await response.json()
            this.setState({ channels: data.channels})
        })
    }

    
    render() {
        return (
            <div className='chat-app'>
                <ChannelList channels={this.state.channels}></ChannelList>
                <MessagesPanel />
            </div>
        )
    }
}
