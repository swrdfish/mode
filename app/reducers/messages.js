const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MSG':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          timeStamp: new Date(),
          sent: false
        }
      ]
    case 'DEL_MSG':
      return state.filter( item => (item.id !== action.id) )
    default:
      return state
  }
}

export default messages
