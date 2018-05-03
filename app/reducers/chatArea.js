const chatArea = (state = {}, action) => {
    switch (action.type) {
        case 'CHAT_USER':
            return {
                uid: action.uid
            }
        case 'DEL_USER':
            if(state.uid == action.userData.uid) {
                return {}
            } else {
                return state
            }
        default:
            return state
    }
}

export default chatArea
