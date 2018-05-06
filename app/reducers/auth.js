const auth = (state = {}, action) => {
    let newState
    switch (action.type) {
        case 'LOGIN':
            newState = {
                ref: action.ref,
                uid: action.uid,
                localIP: action.localIP
            }
            if (action.username) {
                newState.username = action.username
            }
            return newState
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
