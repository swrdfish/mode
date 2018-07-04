import produce from 'immer'


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
            return produce(state, draftState => {
                draftState.username = action.username
            })
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}


export default auth
