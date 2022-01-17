
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'DISPLAY_NOTIFICATION':
        return action.data
    case 'HIDE_NOTIFICATION':
        return {
            message: null,
            notificationType: null,
        }

    default:
        return state
    }
}

export const setNotification = (notification, notificationType, displayTime) => {

    return async (dispatch) => {
        dispatch({ type: 'DISPLAY_NOTIFICATION', data: { message: notification, notificationType } })

        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
                data: null
            })
        }, displayTime * 1000)
    }
}

const initialState = {
    message: null,
    notificationType: null,
}

export default notificationReducer
