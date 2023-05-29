import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide, TableContainer, Table, TableBody, TableRow, TableCell, Typography
} from "@mui/material";
import {useTheme} from "@emotion/react";
import {useUpdateRentalMutation, useUpdateTeacherRentalMutation } from "../../states/apiSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>
})


export default function ReceiveBook ({open, handleClose, book}) {
    const [updateRental, { isSuccess:studentRentalSuccess }] = useUpdateRentalMutation();
    const [updateTeacherRental, { isSuccess }] = useUpdateTeacherRentalMutation();
    const theme = useTheme()
    const handleReceive = async (bookId) => {
        const body = { returned: true }
        if (book.model === 'teacher') {
            await updateTeacherRental({body, rentalId:bookId});
        } else if (book.model === 'student') {
            await updateRental({body, rentalId:bookId})
        }
        handleClose()
    }
    return (
        <div>
            {/*<Button variant="contained" onClick={handleClickOpen}>Open Dialog</Button>*/}
            <Dialog
                open={open}
                maxWidth="md"
                PaperProps={{
                    style: {
                        width: '70%',
                        maxWidth: 'none',
                        height: '90%',
                        backgroundColor: theme.palette.primary[800],
                        fontSize: 24
                    }
                }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle sx={{fontSize: '20px'}}>
                    {"Do you want to receive this book with following Information, Are you sure ?"}
                </DialogTitle>
                <hr/>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">bookId</Typography></TableCell>
                                    <TableCell><Typography variant="h5">{book.bookId}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Name of Book</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{book.nameOfBook}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Author</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{book.author}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Issue Date</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{book.issueDate}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Due Date</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{book.dueDate}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Language</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{book.language}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Category</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{book.categoryName}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Borrower</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{book.rentalFor}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Academic Level</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{book.academicLevel}</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={() => handleReceive(book._id)}>Receive</Button>
                    <Button variant="contained" color="error" onClick={handleClose}>Reject</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
