const room = (state = {}, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        roomRef: action.roomRef,
        usersRef: action.usersRef
      }
    default:
      return state
  }
}

export default room
