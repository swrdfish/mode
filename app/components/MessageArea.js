import React from 'react'
import { connect } from 'react-redux'

import InputArea from './InputArea.js'
import MessageViewer from './MessageViewer.js'


class MessageArea extends React.Component {
    render() {
        let chatter = this.props.userList.find((e)=> e.uid == this.props.chatArea.uid)
        return (
            <div id="message-area" className="col-md-9">
                <MessageViewer chatter={chatter}/>
                <InputArea />
            </div>
        )
    }

}

let mapStateToProps = ({chatArea, userList}) => ({
  chatArea,
  userList
})

const ConnectedMessageArea = connect(mapStateToProps)(MessageArea)
export default ConnectedMessageArea