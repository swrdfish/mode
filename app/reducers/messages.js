import { v4 } from 'node-uuid'


const messages = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_MSG':
            let newState = {...state}
            if(!newState[action.uid]) {
                newState[action.uid] = new Array()
            }
            
            newState[action.uid].push({
                type: action.msgType,
                body: action.body,
                timeStamp: new Date(),
                sent: false,
                isMine: action.isMine,
                id: v4()
            })
            return newState
        case 'AKN_MSG':
            // modify the sent state
            return state
        case 'SEE_MSG':
            //modify the seen state
            return state
        case 'DEL_USER':
            newState = {...state}
            newState[action.userData.uid] = undefined
            return newState
        default:
            return state
    }
}

export default messages
