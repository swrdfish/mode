import produce from 'immer'

const userList = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            return state.concat([action.userData])
        case 'DEL_USER':
            //close rtc connection
            action.connectionManager.closeConnection(action.userData.uid)
            return state.filter(user => user.uid != action.userData.uid)
        case 'CHG_USER':
            return state.map(user => {
                if(action.userData.uid == user.uid) {
                    return produce(action.userData, draftState => {
                        draftState.selected = user.selected
                        draftState.unseen = user.unseen  
                    })
                } else {
                    return user
                }
            })
        case 'ADD_MSG':
            return state.map(user => {
                return produce(user, draftState => {
                    if(action.uid == draftState.uid && !draftState.selected) {
                        draftState.unseen = draftState.unseen != undefined ? draftState.unseen + 1 : 1
                    }
                })
            })
        case 'CHAT_USER':
            return state.map(user => {
                return produce(user, draftState => {
                    if(action.uid == draftState.uid) {
                        draftState.unseen = undefined
                        draftState.selected = true
                    } else {
                        draftState.selected = false
                    }  
                })
            })
        default:
            return state
    }
}

export default userList
