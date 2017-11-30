import { combineReducers } from 'redux'
import messages from './messages'
import contactFilter from './contactFilter'

const peerChatApp = combineReducers({
  messages,
  contactFilter
})

export default peerChatApp
