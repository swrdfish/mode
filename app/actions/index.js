export const addMessage = (uid, text) => ({
  type: 'ADD_MSG',
  uid,
  text
})

export const deleteMessage = (id) => ({
  type: 'DEL_MSG',
  id
})

export const setContactFilter = (username) => ({
  type: 'SET_CONTACT_FILTER',
  username
})