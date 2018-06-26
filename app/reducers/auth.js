const auth = (state = {}, action) => {
    let newState
    switch (action.type) {
        case 'LOGIN':
            return {
                ref: action.ref,
                uid: action.uid,
                localIP: action.localIP,
                username: action.username
            }
        case 'SET_USERNAME':
            newState = {...state}
            newState.username = action.username
            return newState
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}


export default auth
