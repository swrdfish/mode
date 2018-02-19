const auth = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      let auth = {
        ref: action.ref,
        uid: action.uid,
        publicIp: action.publicIp
      }
      if (action.username) {
        auth.username = action.username
      }
      return auth

    case 'LOGOUT':
      return {}

    default:
      return state
  }
}

export default auth
