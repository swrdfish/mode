const messages = (state = {}, action) => {
    console.log("reducer", action.type)
    switch (action.type) {
        case 'ADD_MSG':
            let newState = {...state}
            if(!newState[action.uid]) {
                newState[action.uid] = new Array()
            }
            
            newState[action.uid].push({
                text: action.text,
                timeStamp: new Date(),
                sent: false,
                seen: false,
                isMine: action.isMine
            })
            return newState
        case 'AKN_MSG':
            // modify the sent state
            return state
        case 'SEE_MSG':
            //modify the seen state
            return state
        default:
            return state
    }
}

export default messages
