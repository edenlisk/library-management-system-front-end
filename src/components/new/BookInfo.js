import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide, TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import {useTheme} from "@emotion/react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>
})


export default function AlertDialogSlide () {
    const theme = useTheme()

    const book = [
        {
            id: 7
        },
        {
            issueDate: new Date().toISOString().split('T')[0]
        },
        {
            returnDate: new Date().toISOString().split('T')[0]
        },


    ]
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>Open Dialog</Button>
            <Dialog
                open={open}
                maxWidth="md"
                PaperProps={{
                    style: {
                        width: '50%',
                        maxWidth: 'none',
                        height: '80%',
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
                                    <TableCell>Id</TableCell>
                                    <TableCell>9</TableCell>
                                </TableRow>
                                <TableRow hover={true}>
                                    <TableCell>Issue Date</TableCell>
                                    <TableCell align="left">{new Date().toISOString().split('T')[0]}</TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>Due Date</TableCell>
                                    <TableCell align="left">{new Date().toISOString().split('T')[0]}</TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>Class</TableCell>
                                    <TableCell align="left">Class Five (S5)</TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>Book</TableCell>
                                    <TableCell align="left">48 Laws of power</TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>language</TableCell>
                                    <TableCell align="left">English</TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>Category</TableCell>
                                    <TableCell align="left">History</TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>Author</TableCell>
                                    <TableCell align="left">Kamuala John</TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell>language</TableCell>
                                    <TableCell align="left">English</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={handleClose}>Receive</Button>
                    <Button variant="contained" color="error" onClick={handleClose}>Reject</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}