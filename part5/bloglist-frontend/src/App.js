import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        console.log('logging out', window.localStorage.getItem('loggedBlogAppUser'))
        window.localStorage.removeItem('loggedBlogAppUser')
        window.localStorage.clear()
        setUser(null)
    //window.location.reload()
    }

    const loginForm = () => (
        <Togglable buttonLabel="log in">
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(response => {
                setBlogs(blogs.concat(response))
                setSuccessMessage(`${blogObject.title} is added`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 3000)
                return response
            })
            .catch(
                error => {
                    setSuccessMessage(`error: ${error.response.data.error}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 3000)
                }
            )
    }

    const deleteBlog = (blogObject) => {
        if (window.confirm(`Do you really want to delete ${blogObject.title}?`)) {
            blogService.deleteBlog(blogObject.id).then(() => {
                setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
            })
        }
    }

    const likeBlog = (blogObject) => {
        blogService.update(blogObject.id).then(() => {
            setBlogs(blogs.map(blog => blog.id === blogObject.id ? { ...blog, likes: blog.likes + 1 } : blog))
        })
    }

    const Notification = ({ message }) => {
        const successMessageStyle = {
            color: 'white',
            background: 'green',
            fontStyle: 'italic',
            fontSize: 20
        }
        const errorMessageStyle = {
            color: 'white',
            background: 'red',
            fontStyle: 'italic',
            fontSize: 20
        }

        return (
            <div className="error">
                {errorMessage === null ?
                    <div style={successMessageStyle}>
                        <p>{message}</p>
                    </div> :
                    <div style={errorMessageStyle}>
                        <p>{message}</p>
                    </div>
                }
            </div>

        )
    }

    const blogFormT = () => (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
        </Togglable>
    )

    return (
        <div>
            <h2>blogs</h2>

            {user === null ?
                <div>
                    <Notification message={errorMessage ? errorMessage : successMessage} />
                    <h2>Log in to application</h2>
                    { loginForm() }
                </div> :
                <div>
                    <p>{user.name} logged-in</p>
                    <button onClick={handleLogout}>
            Logout
                    </button>
                    <Notification message={errorMessage ? errorMessage : successMessage} />
                    {blogFormT()}
                    {blogs.map(blog => {
                        if (blog) {
                            return <Blog key={blog.id} blog={blog} removeBlog={deleteBlog} likeBlog={likeBlog}/>
                        } else {
                            return <p>no blog</p>
                        }
                    }
                    )}
                </div>
            }

        </div>
    )
}

// 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.8, 5.10, 5.11, 5.12, 5.13, 5.16, 5.17, 5.18, 5.19, 5.20, 5.21, 5.22

export default App