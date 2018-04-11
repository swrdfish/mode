import React from 'react'


class MessageViewer extends React.Component {
  componentDidMount() {
    this.makeConnection()
  }

  componentDidUpdate() {
    this.makeConnection()
  }

  onDescription(desc) {
    console.log(desc)
  }

  onCreateSessionDescriptionError(e) {
    console.error("Failed to create offfer:", e)
  }

  makeConnection() {
    console.log('have to connect to ', this.props.chatter && this.props.chatter.publicIP)
    const servers = null;  // Allows for RTC server configuration (STUN and TURN).

    // Create peer connections and add behavior.
    let localPeerConnection = new RTCPeerConnection(servers);
    localPeerConnection.createOffer().then(
      onDescription,
      onCreateSessionDescriptionError
    )
  }

	render(){
		return (
			<div className='message-view-wrapper'>
				hello world {this.props.chatter && this.props.chatter.publicIP}
			</div>
		)
	}
}

export default MessageViewer