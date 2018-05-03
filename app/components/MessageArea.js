import React from 'react'
import { connect } from 'react-redux'

import InputArea from './InputArea.js'
import MessageViewer from './MessageViewer.js'
import {addMessage} from '../actions'


class MessageArea extends React.Component {
    constructor(props) {
        super(props)
        this.onSendMessage= this.onSendMessage.bind(this)
    }

    onSendMessage(msg) {
        if(this.props.chatArea.uid && msg) {
            let connection = this.props.room.connectionManager.getConnection(this.props.chatArea.uid)
            if(connection.dataChannel.readyState == "open") {
                this.props.dispatch(addMessage(this.props.chatArea.uid, msg, true))
                connection.dataChannel.send(msg)
            }
        }
    }

    render() {
        let chatter = this.props.chatArea.uid
        let messages = this.props.messages[chatter]
        let inputArea = (<InputArea onSendMessage={this.onSendMessage} />)

        return (
            <div id="message-area" className="col-md-8">
                <MessageViewer chatter={chatter} messages={messages} />
                {chatter?inputArea:''}        
            </div>
        )
    }
}

let mapStateToProps = ({messages, chatArea, room, dispatch}) => ({
    messages,
    chatArea,
    room,
    dispatch
})

const ConnectedMessageArea = connect(mapStateToProps)(MessageArea)
export default ConnectedMessageArea