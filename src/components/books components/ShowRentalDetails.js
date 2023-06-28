import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import {useTheme} from "@emotion/react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>
})

const ShowRentalDetails = ({open, handleClose, rental}) => {
    const theme = useTheme();

    return (
        <div>
            <Dialog
                open={open}
                maxWidth="md"
                PaperProps={{
                    style: {
                        width: '70%',
                        maxWidth: 'none',
                        height: '90%',
                        backgroundColor: theme.palette.primary[900],
                        fontSize: 24
                    }
                }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle sx={{fontSize: '40px', textAlign: "center"}}>
                    RENTAL DETAILS
                </DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">bookId</Typography></TableCell>
                                    <TableCell><Typography variant="h5">{rental.bookId}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Name of Book</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{rental.nameOfBook}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Author</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{rental.author}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Issue Date</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{rental.issueDate}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Due Date</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{rental.dueDate}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Category</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{rental.categoryName}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Academic Level</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{rental.academicLevel}</Typography></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell><Typography variant="h5">Borrower</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h5">{rental.rentalFor}</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="info" onClick={handleClose}>Back</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ShowRentalDetails;