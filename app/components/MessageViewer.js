import React from 'react'


class MessageViewer extends React.Component {
    render(){
        if(this.props.chatter) {
            let renderedMsg = (<div className='empty-message-view'>Say something!</div>)
            if (this.props.messages) {
                let messages = this.props.messages.reduceRight((arr, item) => {
                    let className = item.isMine?'message-bubble mine':'message-bubble'
                    let itemRendered = (
                        <div className='message-bubble-wrapper' key={item.id}>
                            <div className={className}>
                                <span>{item.text}</span>
                                <span className='time-stamp'>{item.timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                            </div>
                        </div>
                    )

                    return (arr = arr.concat(itemRendered))
                }, [])
                renderedMsg = (
                    <div className='messages-scrollable'>
                        {messages}
                    </div>
                )
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