import React from 'react';

import UserProfilePicture from './UserProfilePicture.js'
import UserName from './UserName.js'


class UserInfoDisplay extends React.Component {
	render() {
		return (
			<div className="user-info-wrapper">
				<UserProfilePicture />
				<UserName />
			</div>
		)
	}
}

export default UserInfoDisplay