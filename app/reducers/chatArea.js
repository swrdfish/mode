const chatArea = (state = {}, action) => {
  switch (action.type) {
    case 'CHAT_USER':
      return {
        uid: action.uid
      }
    default:
      return state
  }
}

export default chatArea
