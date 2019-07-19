
const allUsersReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.users
  default:
    return state
  }
}

export const setAllUsers = (users) => {
  return {
    type: 'SET_USERS',
    users
  }
}

export default allUsersReducer