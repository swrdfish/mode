import React from 'react'


class MessageViewer extends React.Component {
    render(){
        if(this.props.chatter) {
            let renderedMsg = 'no messages yet.'
            if (this.props.messages) {
                renderedMsg = this.props.messages.map((item) => {
                    if(!item.isMine) {
                        return (
                            <div className='message-bubble' key={item.timeStamp}>
                                <span>{item.text}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div className='message-bubble mine' key={item.timeStamp}>
                                <span>{item.text}</span>
                            </div>
                        )
                    }
                })
            }
            return (
                <div className='message-view-wrapper'>
                    {renderedMsg}
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