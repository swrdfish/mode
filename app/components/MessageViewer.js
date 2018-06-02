import React from 'react'

class MessageBubble extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let item = this.props.item
        console.log(item)
        let className = item.isMine?'message-bubble mine':'message-bubble'
        let downloadButtonClass = item.isMine?"":"fa fa-download"
        let pretext = item.isMine?"Sent ":"Download "
        let text


        let itemRendered
        if(item.type == "file") {
            if(item.body.count > 1) {
                text = (
                    <a href="#" onClick={this.props.onDownload} data-id={item.body.id}>
                        {item.body.count} files&nbsp;&nbsp;&nbsp;
                        <span className={downloadButtonClass + " download-button"}/>
                    </a>
                )
            } else {
                text = (
                    <a href="#" onClick={this.props.onDownload} data-id={item.body.id}>
                        {item.body.filenames[0]}&nbsp;&nbsp;&nbsp;
                        <span className={downloadButtonClass + " download-button"}/>
                    </a>
                )
            }

            if(item.isMine) {
                text = "" + item.body.count
                text += item.body.count > 1?" files":" file"
            }
            className += " file"
            itemRendered = (
                <div className='message-bubble-wrapper'>
                    <div className={className}>
                        <span>
                            {pretext}&nbsp;&nbsp;{text}               
                        </span>
                        <span className='time-stamp'>{item.timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                    </div>
                </div>
            )
        } else {
            itemRendered = (
                <div className='message-bubble-wrapper'>
                    <div className={className}>
                        <span>{item.body}</span>
                        <span className='time-stamp'>{item.timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                    </div>
                </div>
            )
        }
        return itemRendered
    }
}


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