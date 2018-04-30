import React from 'react'
import { connect } from 'react-redux'

import InputArea from './InputArea.js'
import MessageViewer from './MessageViewer.js'


class MessageArea extends React.Component {
    render() {
        let connectionManager = this.props.room.connectionManager
        let chatter = this.props.chatArea.uid
        return (
            <div id="message-area" className="col-md-9">
                <MessageViewer connectionManager={connectionManager} chatter={chatter} />
                <InputArea />
            </div>
        )
    }
}

let mapStateToProps = ({chatArea, room}) => ({
  chatArea,
  room
})

const ConnectedMessageArea = connect(mapStateToProps)(MessageArea)
export default ConnectedMessageArea