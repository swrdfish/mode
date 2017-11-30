import React from 'react'
import { connect } from 'react-redux'

import ContactProfilePicture from './ContactProfilePicture.js'


class ContactList extends React.Component {
	constructor(props){
		super(props)	
	}

	render() {
		let userToDisplay = this.props.activeContacts
		if(this.props.searchText !== ''){
			userToDisplay = userToDisplay.filter(contact => (contact.name.includes(this.props.searchText)))
		}

		let contacts = userToDisplay.map(function (contact) {
			return (
				<div className="contact-list-item">
					<ContactProfilePicture profilePicture="/static/img/default_contact.jpg" />
					<div className="contact-name">
						{contact.name}
					</div>
				</div>
			);
		}, this);

		return (
			<div>
				{(contacts.length > 0)? contacts : 'oops no one there :('}
			</div>
		)
	}
}


const mapStateToProps = ({contactFilter}) => ({
  searchText: contactFilter
})

let ConnectedContactList = connect(mapStateToProps)(ContactList) 
export default ConnectedContactList