import React from 'react';
import UserProfilePicture from './UserProfilePicture'
import UserName from './UserName'

import { connect } from 'react-redux'
import { setContactFilter, setUsername } from '../actions'


class UserInfoDisplay extends React.Component {
  
    constructor(props) {
        super(props)
        this.onUpdateUsername = this.onUpdateUsername.bind(this)
    }

    onUpdateUsername(username) {
        let usersRef = this.props.room.roomRef.child('users')
        let userRef = usersRef.child(this.props.auth.uid)
        userRef.child('username').set(username)
        this.props.dispatch(setUsername(username))
    }

	render() {
        let username = this.props.auth.username || this.props.auth.localIP
        let presence = (this.props.auth.uid !== undefined)? "presence-active" : "presence-inactive"
		return (
			<div className="user-info-wrapper">
				<UserProfilePicture />
				<UserName value={username} onUpdateUsername={this.onUpdateUsername}/>
                <span className={presence} />
			</div>
		)
	}
}


const mapStateToProps = ({auth, room, dispatch}) => ({
  auth,
  room,
  dispatch
})

let ConnectedUserInfoDisplay = connect(mapStateToProps)(UserInfoDisplay)
export default ConnectedUserInfoDisplay