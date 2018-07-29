import React from 'react'
import { connect } from 'react-redux'
import uuid from 'node-uuid';

import InputArea from './InputArea.js'
import MessageViewer from './MessageViewer.js'
import {addMessage, addFiles} from '../actions'


export class MessageArea extends React.Component {
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
            this.props.dispatch(addFiles(id, files))
            let filenames = []
            for( let iii = 0; iii < files.length; iii++ ) {
                filenames.push(files.item(iii).name)
            }
            let msg = {
                count : files.length,
                id,
                filenames 
            }
            let connection = this.props.room.connectionManager.getConnection(this.props.chatArea.uid)
            if(connection.dataChannel.readyState == "open") {
                this.props.dispatch(addMessage(this.props.chatArea.uid, "file", msg, true))
                connection.dataChannel.send(JSON.stringify({
                    type: "file",
                    message: msg
                }))
            }
        }
    }

    onDownload(event) {
        let fileid = event.target.getAttribute("data-id")
        let connection = this.props.room.connectionManager.getConnection(this.props.chatArea.uid)
        connection.dataChannel.send(JSON.stringify({
            type: "get",
            message: fileid
        }))
        console.log("download the file", fileid)
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