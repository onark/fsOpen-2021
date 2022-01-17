import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'

const UserPage = () => {
    const { params: { id: userIdMatch }, } = useRouteMatch('/users/:id')
    const userWithBlogs = useSelector((state) => state.users.find((u) => u.id === userIdMatch))

    if (!userWithBlogs) {
        return <Redirect to="/users" />
    }

    const { name, blogs } = userWithBlogs

    return (
        <div >
            <div>
                <div>
                    {name}
                </div>
                <div>Added blogs:</div>
                <ul>
                    {blogs.map(({ id, title }) => (
                        <li key={id}>
                            <Link to={`/blogs/${id}`}>{title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UserPage
