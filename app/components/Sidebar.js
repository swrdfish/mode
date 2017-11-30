import React from 'react'

import UserInfoDisplay from './UserInfoDisplay'
import SearchBar from './SearchBar'
import ContactList from './ContactList'


const activeContacts = [
    {name: 'bini'},
    {name: 'atul'},
    {name: 'sumant'},
    {name: 'bosana'},
    {name: 'gibi'},
    {name: 'kumar'}
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