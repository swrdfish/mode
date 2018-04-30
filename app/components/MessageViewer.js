import React from 'react'


class MessageViewer extends React.Component {
    render(){
        if(this.props.chatter) {
            let connection = this.props.connectionManager.getConnection(this.props.chatter)
            let channel = connection.dataChannel
            return (
                <div className='message-view-wrapper'>
                    connecting ..
                </div>
            )
        } else {
            return (
                <div className='message-view-wrapper'>
                    select someone to chat with.
                </div>
            )
        }
    }
}

export default MessageViewer