import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import { createBlog } from '../reducers/blogReducer'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@material-ui/core/Typography'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs.sort((x, y) => y.likes - x.likes))
    const dispatch = useDispatch()
    const blogFormRef = React.useRef()

    const handleBlogCreate = ({ title, author, url }) => {
        dispatch(createBlog({ title, author, url }))
        blogFormRef.current.toggleVisibility()
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Box m={3}>
                <Typography variant="h4" >Blogs</Typography>
            </Box>
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <CreateBlogForm createBlog={handleBlogCreate} />
            </Togglable>
            <Divider />
            <nav aria-label="secondary blogs">
                <List>
                    {blogs.map(({ id, title, author }) => (
                        <ListItem key={id}>
                            <Link to={`/blogs/${id}/`}>
                                <ListItemText>{title} by {author}</ListItemText>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </nav>
        </Box>
    )
}

export default Blogs
