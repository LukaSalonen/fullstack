
const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'RESET':
      return initialState
    default: return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer