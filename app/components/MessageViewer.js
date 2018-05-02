import React from 'react'


class MessageViewer extends React.Component {
    render(){
        if(this.props.chatter) {
            let renderedMsg = (<div className='empty-message-view'>Say something!</div>)
            if (this.props.messages) {
                renderedMsg = this.props.messages.reverse().map((item) => {
                    let className = item.isMine?'message-bubble mine':'message-bubble' 
                    return (
                        <div className='message-bubble-wrapper' key={item.timeStamp}>
                            <div className={className}>
                                <span>{item.text}</span>
                                <span className='time-stamp'>{item.timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                            </div>
                        </div>
                    )
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
                    <div className='empty-message-view'>select someone to chat with.</div>
                </div>
            )
        }
    }
}

export default MessageViewer