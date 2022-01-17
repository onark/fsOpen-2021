import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import { setCurrentUser, logout } from './reducers/authReducer'

import blogService from './services/blogs'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import MainHeader from './components/MainHeader'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

const App = () => {
    const currentUser = useSelector((state) => state.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser) {
            dispatch(initializeBlogs())
            dispatch(initializeUsers())
        }
    }, [dispatch, currentUser])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setCurrentUser(user))
        }
    }, [dispatch])

    const handleLogout = () => {
        blogService.clearToken()
        window.localStorage.clear()
        dispatch(logout())
    }

    return (
        <>
            {!currentUser ? <LoginForm /> :
                <>
                    <MainHeader userName={currentUser.name} handleLogout={handleLogout} />
                    <Notification />
                    <Switch>
                        <Route path="/users/:id">
                            <User />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/blogs/:id">
                            <Blog />
                        </Route>
                        <Route path="/">
                            <Blogs />
                        </Route>
                    </Switch>
                </>}
        </>
    )
}

export default App
