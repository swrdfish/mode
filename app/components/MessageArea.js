import React from 'react'

import InputArea from './InputArea.js'
import MessageViewer from './MessageViewer.js'


class MessageArea extends React.Component {
    render() {
        return (
            <div id="message-area" className="col-md-9">
                <MessageViewer />
                <InputArea />
            </div>
        )
    }

}

export default MessageArea