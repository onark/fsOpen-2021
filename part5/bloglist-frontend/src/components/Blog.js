import React from 'react'
const Blog = ({ blog, removeBlog, likeBlog }) => {
    return (
        <div className='blog'>
            <p className="title">Title: {blog.title}</p>
            <p>Author: {blog.author}</p>
            <span>Likes: </span>
            <span id='likes'>{blog.likes}</span>
            <button onClick={() => removeBlog(blog)}>Delete</button>
            <button id='like-button' className="like" onClick={() => likeBlog(blog)}>Like</button>
        </div>
    )

}

export default Blog