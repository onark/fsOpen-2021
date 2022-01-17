import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const authReducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGIN_USER':
        return action.data
    case 'LOGOUT_USER':
        return null
    default:
        return state
    }
}

export const loginUser = ({ username, password }) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            dispatch(setCurrentUser(user))
        } catch (error) {
            dispatch(setNotification('Wrong credentials', 'error'))
        }
    }
}

export const checkCurrentUser = () => {
    return (dispatch) => {
        const loggedInUserJSON = window.localStorage.getItem('loggedBlogUser')

        if (loggedInUserJSON) {
            const user = JSON.parse(loggedInUserJSON)
            dispatch(setCurrentUser(user))
        }
    }
}

export const setCurrentUser = (user) => {
    return {
        type: 'LOGIN_USER',
        data: user,
    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    return { type: 'LOGOUT_USER' }
}

export default authReducer
