import React from 'react'


class InputArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}

        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleKeyPress(event) {
        console.log('press')
        if(event.key == 'Enter'){
            event.preventDefault()
            this.props.onSendMessage(this.state.value)
            this.setState({value: ''})
        }
    }

    handleChange(event) {
        console.log('change')
        this.setState({value: event.target.value})
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

				<i className="fa fa-reply" id="attach-button" aria-hidden="true"></i>
			</div>
		)
	}
}

export default InputArea