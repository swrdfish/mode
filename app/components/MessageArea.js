import React from 'react'
import { connect } from 'react-redux'

import InputArea from './InputArea.js'
import MessageViewer from './MessageViewer.js'


class MessageArea extends React.Component {
    render() {
        let userRef = null,
            myRef = null

        if (this.props.chatArea.uid) {
            userRef = this.props.room.usersRef.child(this.props.chatArea.uid)
            myRef = this.props.room.usersRef.child(this.props.auth.uid)
        }
 
        return (
            <div id="message-area" className="col-md-9">
                <MessageViewer userRef={userRef} myRef={myRef} myUid={this.props.auth.uid} />
                <InputArea />
            </div>
        )
    }
}

let mapStateToProps = ({chatArea, userList, room, auth}) => ({
  chatArea,
  userList,
  room,
  auth
})

const ConnectedMessageArea = connect(mapStateToProps)(MessageArea)
export default ConnectedMessageArea