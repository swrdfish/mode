import React from 'react'

import UserInfoDisplay from './UserInfoDisplay'
import SearchBar from './SearchBar'
import ContactList from './ContactList'


class Sidebar extends React.Component {
    render() {
        return (
            <div id="sidebar" className="col-md-4">
                <UserInfoDisplay />
                <SearchBar />
                <ContactList />
            </div>
        )
    }

}

export default Sidebar