const contactFilter = (state = '', action) => {
  switch (action.type) {
    case 'SET_CONTACT_FILTER':
      return action.username
    default:
      return state
  }
}

export default contactFilter
