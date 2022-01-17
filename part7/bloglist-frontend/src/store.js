import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    blogs: blogReducer,
    users: userReducer,
    currentUser: authReducer,
    notification: notificationReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
