import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@material-ui/core/Typography'

const Users = () => {
    const users = useSelector((state) => state.users)

    return (
        <>
            <Box m={3}>
                <Typography variant="h4">Users</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ width: 550 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell align="left">Blogs Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(({ id, name, blogs }) => (
                            <TableRow
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={`/users/${id}`}>{name}</Link>
                                </TableCell>
                                <TableCell align="left">{blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Users
