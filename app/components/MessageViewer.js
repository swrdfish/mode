import React from 'react'
import MessageBubble from "./MessageBubble"


class MessageViewer extends React.Component {
    render(){
        if(this.props.chatter) {
            let renderedMsg = (<div className='empty-message-view'>Say something!</div>)
            if (this.props.messages) {
                let messages = this.props.messages.reduceRight((arr, item) => {
                    return arr.concat((<MessageBubble item={item} key={item.id} onDownload={this.props.onDownload}/>))
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