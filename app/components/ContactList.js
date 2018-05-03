import React from 'react'
import { connect } from 'react-redux'
import fuzzysearch from 'fuzzysearch'

import ContactProfilePicture from './ContactProfilePicture.js'
import { chat } from '../actions'


class ContactList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selected: ""
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        let selected = e.currentTarget.getAttribute("data-id")
        if (selected) {
            this.setState({selected})
            this.props.dispatch(chat(selected))
            this.props.room.connectionManager.getConnection(selected)
        }
    }

    render() {  
        let userList = this.props.userList || []
        let userToDisplay = userList.map(user => ({
                "name": user.name? user.name : user.localIP,
                "id": user.uid,
                "unseen": user.unseen
            })
        )

        if(this.props.searchText !== ''){
            userToDisplay = userToDisplay.filter(contact => (fuzzysearch(this.props.searchText, contact.name.toLowerCase())))
        }

        let contacts = userToDisplay.map(contact => {
            let className = this.state.selected === contact.id ? 'contact-list-item selected' : 'contact-list-item'
            let unseen = contact.unseen?(
                <div className="unseen-count-wrapper">
                    <span className="unseen-count">{contact.unseen}</span>
                </div>
            ) : ''
            return (
                <div className={className} key={contact.id} data-id={contact.id} onClick={this.handleClick} >
                    <ContactProfilePicture profilePicture="/static/img/default_contact.jpg" />
                    <div className="contact-name">
                        {contact.name}
                    </div>
                    {unseen}
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


const mapStateToProps = ({userList, contactFilter, room, dispatch}) => ({
    searchText: contactFilter,
    userList,
    room,
    dispatch
})

let ConnectedContactList = connect(mapStateToProps)(ContactList) 
export default ConnectedContactList