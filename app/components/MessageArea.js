import React from 'react'
import { connect } from 'react-redux'
import uuid from 'node-uuid';

import InputArea from './InputArea.js'
import MessageViewer from './MessageViewer.js'
import {addMessage} from '../actions'


class MessageArea extends React.Component {
    constructor(props) {
        super(props)
        this.onSendMessage = this.onSendMessage.bind(this)
        this.onSendFile = this.onSendFile.bind(this)
        this.onDownload = this.onDownload.bind(this)
        this.files = {}
    }

    onSendMessage(msg) {
        if(this.props.chatArea.uid && msg) {
            let connection = this.props.room.connectionManager.getConnection(this.props.chatArea.uid)
            if(connection.dataChannel.readyState == "open") {
                this.props.dispatch(addMessage(this.props.chatArea.uid, "text", msg, true))
                connection.dataChannel.send(JSON.stringify({
                    type: "text",
                    message: msg
                }))
            }
        }
    }

    onSendFile(files) {
        if(this.props.chatArea.uid && files) {
            let id = uuid.v4()
            this.files[uuid] = files
            let msg = {
                count: files.length
            }
            let connection = this.props.room.connectionManager.getConnection(this.props.chatArea.uid)
            if(connection.dataChannel.readyState == "open") {
                this.props.dispatch(addMessage(this.props.chatArea.uid, "file", msg.count, true))
                connection.dataChannel.send(JSON.stringify({
                    type: "file",
                    message: msg
                }))
            }
        }
    }

    onDownload(event) {
        console.log("download the file", event)
    }

    render() {
        let chatter = this.props.chatArea.uid
        let messages = this.props.messages[chatter]
        let inputArea = (
            <InputArea 
                onSendMessage={this.onSendMessage}
                onSendFile={this.onSendFile} 
                onDownload={this.onDownload} />
        )

        return (
            <div id="message-area" className="col-md-8">
                <MessageViewer
                    chatter={chatter}
                    messages={messages}
                    onDownload={this.onDownload} />
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