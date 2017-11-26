import React from 'react'

import InputArea from './InputArea.js'


class MessageArea extends React.Component {
    render() {
        return (
            <div id="sidebar" className="col-md-8">
                <div>
                    MessageArea content
                </div>
                <InputArea />
            </div>
        )
    }

}

export default MessageArea