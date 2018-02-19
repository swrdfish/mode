import { combineReducers } from 'redux'
import messages from './messages'
import auth from './auth'
import contactFilter from './contactFilter'
import notifications from './notifications'


const peerChatApp = combineReducers({
  auth,
  messages,
  contactFilter,
  notifications
})

export default peerChatApp
