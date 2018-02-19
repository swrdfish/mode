const notifications = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return state.concat({ 'type': action.notificationType, 'msg': action.message})
    case 'DEL_NOTIFICATION':
      return state.filter( (item, idx) => idx == action.index )
    default:
      return state
  }
}

export default notifications
