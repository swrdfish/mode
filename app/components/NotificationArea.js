import React from 'react'
import { connect } from 'react-redux'
import {unnotify} from '../actions'


class NotificationArea extends React.Component {
  constructor(props){
    super(props)
    this.handleClearNotification = this.handleClearNotification.bind(this)
  }

  handleClearNotification(event) {
    this.props.dispatch(unnotify(event.target.getAttribute('data-notification-idx')))
  }

  render() {
    let displayNotifications = this.props.notifications.map((notify, index) => {
      return (
        <div className={notify.type == 'error'? 'notification error': 'notification'} key={index}>
          {notify.msg}
          <i className="fa fa-close clear-notification" aria-hidden="true" data-notification-idx={index} onClick={this.handleClearNotification}></i>
        </div>
      )
    })

    return (
      <div className="notification-area">
        {displayNotifications}
      </div>
    )
  }
}

const mapStateToProps = ({notifications, dispatch}) => ({
  notifications,
  dispatch
})

let ConnectedNotificationArea = connect(mapStateToProps)(NotificationArea) 
export default ConnectedNotificationArea;