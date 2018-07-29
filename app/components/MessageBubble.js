import React from 'react'
import AutoLinker from 'autolinker'
import escapeHTML from 'escape-html'


class MessageBubble extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let item = this.props.item
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
            let messageBody = AutoLinker.link(escapeHTML(item.body), {className: "message-bubble-link"})
            itemRendered = (
                <div className='message-bubble-wrapper'>
                    <div className={className}>
                        <span className='message-bubble-body' dangerouslySetInnerHTML={{ __html: messageBody }}></span>
                        <span className='time-stamp'>{item.timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                    </div>
                </div>
            )
        }
        return itemRendered
    }
}

export default MessageBubble