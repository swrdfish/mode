export const addMessage = (uid, msgType, body, isMine) => ({
  type: 'ADD_MSG',
  uid,
  msgType,
  body,
  isMine
})

export const deleteMessage = (id) => ({
  type: 'DEL_MSG',
  id
})

export const setContactFilter = (username) => ({
  type: 'SET_CONTACT_FILTER',
  username
})

export const addUser = (userData) => ({
  type: 'ADD_USER',
  userData
})

export const removeUser = (userData, connectionManager) => ({
  type: 'DEL_USER',
  userData,
  connectionManager
})

export const changeUser = (userData) => ({
  type: 'CHG_USER',
  userData
})

export const login = (ref, username, uid, localIP) => ({
  type: 'LOGIN',
  ref,
  username, 
  uid,
  localIP
})

export const chat = (uid) => ({
  type: 'CHAT_USER',
  uid
})

export const notify = (message, type) => ({
  type: 'ADD_NOTIFICATION',
  notificationType: type,
  message
})

export const unnotify = (index) => ({
  type: 'DEL_NOTIFICATION',
  index
})

export const joinRoom = (connectionManager, roomRef) => ({
  type: 'JOIN_ROOM',
  connectionManager,
  roomRef
})

export const setUsername = (username) => ({
  type: 'SET_USERNAME',
  username
})

export const addFiles = (id, files) => ({
  type: 'ADD_FILE',
  id,
  files
})