
const initState = {
  text: '',
  kind: ''
}

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'RESET':
    return initState
  default:
    return state
  }
}

export const setNotification = (data) => {
  return {
    type: 'SET_NOTIFICATION',
    data
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer