import React from 'react'

import UserInfoDisplay from './UserInfoDisplay'
import SearchBar from './SearchBar'
import ContactList from './ContactList'


const activeContacts = [
    {name: 'Binayak Ghosh'},
    {name: 'Atul Aditya'},
    {name: 'Sumant Motu'},
    {name: 'Shuvam Bosana'},
    {name: 'Chiranjiv Roy'},
    {name: 'Kumar Gaurav'}
]

const previousContacts = []


class Sidebar extends React.Component {
    render() {
        return (
            <div id="sidebar" className="col-md-3">
                <UserInfoDisplay />
                <SearchBar />
                <ContactList activeContacts={activeContacts} previousContacts={previousContacts} />
            </div>
        )
    }

}

export default Sidebar