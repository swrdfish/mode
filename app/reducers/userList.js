const userList = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            return state.concat([action.userData])
        case 'DEL_USER':
            //close rtc connection
            action.connectionManager.closeConnection(action.userData.uid)
            return state.filter(user => user.uid != action.userData.uid)
        case 'ADD_MSG':
            return state.map(user => {
                if(action.uid == user.uid && !user.selected) {
                    user.unseen = user.unseen != undefined ? user.unseen + 1 : 1
                }
                return user
            })
        case 'CHAT_USER':
            return state.map(user => {
                if(action.uid == user.uid) {
                    user.unseen = undefined
                    user.selected = true
                } else {
                    user.selected = false
                }
                return user
            })
        default:
        return state
    }
}

export default userList
