import React from 'react';
import UserProfilePicture from './UserProfilePicture'
import UserName from './UserName'

import { connect } from 'react-redux'
import { setContactFilter } from '../actions'


class UserInfoDisplay extends React.Component {
  
  constructor(props) {
    super(props)
  }

	render() {
    let presence = (this.props.auth.uid !== undefined)? "presence-active" : "presence-inactive"
		return (
			<div className="user-info-wrapper">
				<UserProfilePicture />
				<UserName />
        <span className={presence} />
			</div>
		)
	}
}


const mapStateToProps = ({auth}) => ({
  auth
})

let ConnectedUserInfoDisplay = connect(mapStateToProps)(UserInfoDisplay)
export default ConnectedUserInfoDisplay