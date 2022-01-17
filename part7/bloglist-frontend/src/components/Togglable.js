import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <Box
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            marginLeft="10px"
        >
            <div style={hideWhenVisible}>
                <Button variant="contained" onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Box marginLeft='9px'>
                    <Button variant="contained" onClick={toggleVisibility}>cancel</Button>
                </Box>
            </div>
        </Box>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Toggleable'

export default Togglable
