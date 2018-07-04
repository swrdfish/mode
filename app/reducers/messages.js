import { v4 } from 'node-uuid'
import produce from 'immer'


const messages = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_MSG':
            return produce(state, draftState => {
                if(!draftState[action.uid]) {
                    draftState[action.uid] = new Array()
                }

                draftState[action.uid].push({
                    type: action.msgType,
                    body: action.body,
                    timeStamp: new Date(),
                    sent: false,
                    isMine: action.isMine,
                    id: v4()
                })  
            })            
        case 'AKN_MSG':
            // modify the sent state
            return state
        case 'SEE_MSG':
            //modify the seen state
            return state
        case 'DEL_USER':
            return produce(state, draftState => {
                draftState[action.userData.uid] = undefined
            })
        default:
            return state
    }
}

export default messages
