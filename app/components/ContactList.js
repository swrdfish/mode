import React from 'react'

import ContactProfilePicture from './ContactProfilePicture.js'


class ContactList extends React.Component {
	constructor(props){
		super(props)	
	}

	render() {
		let todoItems = this.props.activeContacts.map(function (todo) {
			return (
				<div className="contact-list-item">
					<ContactProfilePicture profilePicture="/static/img/default_contact.jpg" />
					<div className="contact-name">
						{todo.name}
					</div>
				</div>
			);
		}, this);

		return (
			<div>
				{todoItems}
			</div>
		)
	}
}

export default ContactList