const room = (state = {}, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        roomRef: action.roomRef,
        connectionManager: action.connectionManager
      }
    default:
      return state
  }
}

export default room
