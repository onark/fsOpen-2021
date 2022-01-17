import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS':
        return action.data
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'UPDATE_BLOG':
        return state.map((blog) => (blog.id === action.data.id ? action.data : blog))
    case 'DELETE_BLOG':
        return state.filter((blog) => blog.id !== action.data.id)
    default:
        return state
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({ type: 'INIT_BLOGS', data: blogs })
    }
}

export const createBlog = (blogObject) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blogObject)
            dispatch({ type: 'NEW_BLOG', data: newBlog })
        } catch (error) {
            dispatch(setNotification(`Error, ${blogObject.title} not created`, 'error', 3))
        }
    }
}

export const commentBlog = (blogObject) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.comment(blogObject)
            dispatch({ type: 'UPDATE_BLOG', data: updatedBlog })
        } catch (error) {
            dispatch(setNotification(`Error while commenting, blog ${blogObject.title}`, 'error', 3))
        }
    }
}

export const likeBlog = (blogObject) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.update({ ...blogObject, likes: blogObject.likes + 1 })
            dispatch({ type: 'UPDATE_BLOG', data: updatedBlog })
        } catch (error) {
            dispatch(setNotification(`Error adding like to blog ${blogObject.title}`, 'error', 3))
        }
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        const response = await blogService.deleteBlog(id)
        if (response.status === 204) {
            dispatch({ type: 'DELETE_BLOG', data: { id } })
        } else {
            dispatch(setNotification('Error, can not delete blog', 'error', 3))
        }
    }
}

export default blogReducer
