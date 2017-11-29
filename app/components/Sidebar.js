import React from 'react'

import UserInfoDisplay from './UserInfoDisplay'
import SearchBar from './SearchBar'
import ActiveUsersList from './ActiveUsersList'


class Sidebar extends React.Component {
    render() {
        return (
            <div id="sidebar" className="col-md-3">
                <UserInfoDisplay />
                <SearchBar />
                <ActiveUsersList />
            </div>
        )
    }

}

export default Sidebar