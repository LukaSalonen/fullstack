
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

export const setNotification = (message, delay) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    }) 
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, delay)
  }
}

export default notificationReducer