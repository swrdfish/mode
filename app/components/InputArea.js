import React from 'react'


class InputArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}

        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFileInputChange = this.handleFileInputChange.bind(this)
    }

    handleKeyPress(event) {
        if(event.key == 'Enter'){
            event.preventDefault()
            this.props.onSendMessage(this.state.value)
            this.setState({value: ''})
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleFileInputChange(event) {
        this.setState({files:event.target.files})
        this.props.onSendFile(event.target.files)
        console.log(event.target.files)
    }

	render() {
		return (
			<div className="input-area-wrapper">
				<input 
                    type="text" 
                    placeholder="Type message"
                    value={this.state.value}
                    className="input-area-inputfiled"
                    onKeyPress={this.handleKeyPress} 
                    onChange={this.handleChange} />
                <div className="file-input-wrapper fa fa-paperclip">
				    <input 
                        className="file-input"
                        id="attach-button"
                        aria-hidden="true"
                        type="file"
                        name="file-input"
                        multiple="multiple"
                        onChange={this.handleFileInputChange} />
                </div>
			</div>
		)
	}
}

export default InputArea