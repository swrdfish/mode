import React from 'react'


class ContactProfilePicture extends React.Component {
	render(){
		let backgroundImage = {
			backgroundImage: 'url(' + this.props.profilePicture + ')'
		}
		return (<div className="contact-profile-picture" style={backgroundImage}></div>)
	}
}

export default ContactProfilePicture