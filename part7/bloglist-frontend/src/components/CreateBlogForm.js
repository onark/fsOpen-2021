import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'


const CreateBlogForm = ({ createBlog }) => {
    const [title, resetTitle] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [url, resetUrl] = useField('text')

    const handleSubmit = (event) => {
        event.preventDefault()
        createBlog({
            title: title.value,
            author: author.value,
            url: url.value,
        })
        resetTitle()
        resetAuthor()
        resetUrl()
    }


    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <Input placeholder="Title" inputProps={title} />
                <Input placeholder="Author" inputProps={author} />
                <Input placeholder="Url" inputProps={url} />
            </Box>
            <Box
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
            >
                <Button variant="contained" onClick={handleSubmit}>Create</Button>
            </Box>
        </>
    )
}

CreateBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm
