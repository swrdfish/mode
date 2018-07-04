import produce from 'immer'


const files = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_FILE':
            return produce(state, draftState => {
                draftState[action.id] = action.files                
            })
        default:
            return state
    }
}

export default files
