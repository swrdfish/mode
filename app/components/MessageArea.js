import React from 'react'

import InputArea from './InputArea.js'


class MessageArea extends React.Component {
    render() {
        return (
            <div id="message-area" className="col-md-9">
                <div>
                    MessageArea content
                </div>
                <InputArea />
            </div>
        )
    }

}

export default MessageArea