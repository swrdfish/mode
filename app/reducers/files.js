
const files = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_FILE':
            let newState = {...state}
            newState[action.id] = action.files
            return newState
        default:
            return state
    }
}

export default files
