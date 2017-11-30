import React from 'react'


class InputArea extends React.Component {
	render() {
		return (
			<div className="input-area-wrapper">
				<input type="text" placeholder="Type message" className="input-area-inputfiled" />
				<i className="fa fa-paper-plane" id="send-button" aria-hidden="true"></i>
			</div>
		)
	}
}

export default InputArea