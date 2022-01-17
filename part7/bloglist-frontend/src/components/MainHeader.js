import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const MainHeader = ({ userName, handleLogout }) => (
    <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="left"
                noWrap
                sx={{ flex: 1 }}
            >
                Blogslist App
            </Typography>

            <Typography
                color="inherit"
                align="right"
                noWrap
                sx={{ flex: 1 }}
            >
                {userName}
            </Typography>
            <Box aligh="right" marginLeft="10px">
                <Button variant="outlined" size="small" onClick={handleLogout}>
                    Sign out
                </Button>
            </Box>
        </Toolbar>
        <Toolbar
            component="nav"
            variant="dense"
            align="left"
            sx={{ justifyContent: 'space-between', overflowX: 'auto', width: 1/12 }}
        >
            <Link to="/blogs">Blogs</Link>
            <Link to="/users">Users</Link>
        </Toolbar>
    </React.Fragment>
)

MainHeader.propTypes = {
    userName: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
}

export default MainHeader
