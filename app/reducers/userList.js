const userList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return state.concat([action.userData])
    case 'DEL_USER':
      return state.filter(user => user.uid != action.userData.uid)
    default:
      return state
  }
}

export default userList
