const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification, mseconds) => {
  if (window.timeoutID) {
    window.clearTimeout(window.timeoutID);
  } 
  
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification
    })

    window.timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        notification: null
      })
    }, 1000 * mseconds)
  }
}

export default notificationReducer