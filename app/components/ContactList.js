import React from 'react'
import { connect } from 'react-redux'
import fuzzysearch from 'fuzzysearch'

import ContactProfilePicture from './ContactProfilePicture.js'
import { chat } from '../actions'


class ContactList extends React.Component {
	constructor(props){
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		if (e.currentTarget.getAttribute("data-id")) {
			this.props.dispatch(chat(e.currentTarget.getAttribute("data-id")))
		}
	}

	render() {
		let userList = this.props.userList || []
		let userToDisplay = userList.map(user => ({
				"name": user.name? user.name : user.localIP,
				"id": user.uid
			})
		)

		if(this.props.searchText !== ''){
			userToDisplay = userToDisplay.filter(contact => (fuzzysearch(this.props.searchText, contact.name.toLowerCase())))
		}

		let contacts = userToDisplay.map(function (contact) {
			return (
				<div className="contact-list-item" key={contact.id} data-id={contact.id} onClick={this.handleClick} >
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


const mapStateToProps = ({userList, contactFilter, dispatch}) => ({
  searchText: contactFilter,
  userList,
  dispatch
})

let ConnectedContactList = connect(mapStateToProps)(ContactList) 
export default ConnectedContactList