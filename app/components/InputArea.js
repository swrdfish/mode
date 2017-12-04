import React from 'react'


class InputArea extends React.Component {
	render() {
		return (
			<div className="input-area-wrapper">
				<input type="text" placeholder="Type message" className="input-area-inputfiled" />
				<i className="fa fa-paperclip" id="attach-button" aria-hidden="true"></i>
			</div>
		)
	}
}

export default InputArea