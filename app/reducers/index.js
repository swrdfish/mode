import { combineReducers } from 'redux'
import messages from './messages'
import auth from './auth'
import contactFilter from './contactFilter'
import notifications from './notifications'
import userList from './userList'
import chatArea from './chatArea'


const peerChatApp = combineReducers({
  auth,
  messages,
  contactFilter,
  notifications,
  userList,
  chatArea
})

export default peerChatApp
