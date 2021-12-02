
import React, { useState } from 'react'


const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const handleTitleChange = (event) => {
        setBlogTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setBlogAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setBlogUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        })
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                <h2>Add New Blog</h2>
                <div>
                    title:
                    <input
                        type="text"
                        name="blogTitle"
                        id="blogTitle"
                        value={blogTitle}
                        onChange={handleTitleChange} />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        name="blogAuthor"
                        id="blogAuthor"
                        value={blogAuthor}
                        onChange={handleAuthorChange} />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name="blogUrl"
                        value={blogUrl}
                        onChange={handleUrlChange} />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm