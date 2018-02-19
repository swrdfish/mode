import React from 'react'
import { connect } from 'react-redux'
import fuzzysearch from 'fuzzysearch'

import ContactProfilePicture from './ContactProfilePicture.js'


class ContactList extends React.Component {
	constructor(props){
		super(props)	
	}

	render() {
		let userToDisplay = this.props.activeContacts
		if(this.props.searchText !== ''){
			userToDisplay = userToDisplay.filter(contact => (fuzzysearch(this.props.searchText, contact.name.toLowerCase())))
		}

		let contacts = userToDisplay.map(function (contact) {
			return (
				<div className="contact-list-item" key={contact.name}>
					<ContactProfilePicture profilePicture="/static/img/default_contact.jpg" />
					<div className="contact-name">
						{contact.name}
					</div>
				</div>
			);
		}, this);

		return (
			<div>
				{(contacts.length > 0)? contacts : (<div className="contact-not-found">No contacts found.</div>)}
			</div>
		)
	}
}


const mapStateToProps = ({contactFilter}) => ({
  searchText: contactFilter
})

let ConnectedContactList = connect(mapStateToProps)(ContactList) 
export default ConnectedContactList