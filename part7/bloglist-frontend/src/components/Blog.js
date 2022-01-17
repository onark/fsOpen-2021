import React from 'react'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import Comments from './Comments'

const Blog = () => {
    const {
        params: { id: blogIdMatch },
    } = useRouteMatch('/blogs/:id')
    const blog = useSelector((state) => state.blogs.find((b) => b.id === blogIdMatch))
    const currentUser = useSelector((state) => state.currentUser)
    const dispatch = useDispatch()

    if (!blog) {
        return <Redirect to="/" />
    }

    const { id, url, title, author, likes, user, comments } = blog

    const handleDelete = () => {
        if (window.confirm(`Remove blog ${title} by ${author}?`)) {
            dispatch(deleteBlog(id))
        }
    }

    const handleLike = () => {
        dispatch(likeBlog(blog))
    }

    const handleCommentSave = (comment) => {
        dispatch(commentBlog({ ...blog, comments: [...comments, comment] }))
    }

    return (
        <div>
            <div>
                <div>
                    {title} by {author}
                </div>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                </a>
                <p className="likes">
                    {likes} likes
                    <button  onClick={handleLike}>
                        Add
                    </button>
                </p>
                <p>
                    Added by: <Link to={`/users/${user.id}`}>{user.name}</Link>
                </p>
                {user.username === currentUser.username && <button onClick={handleDelete}>delete</button>}
            </div>
            <Comments comments={'' || comments} handleAddComment={handleCommentSave} />
        </div>
    )
}

export default Blog
