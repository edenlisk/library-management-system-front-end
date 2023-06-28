import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle,useTheme} from "@mui/material";
import {useDeleteRentalMutation} from "../../states/apiSlice";
import {toast} from "react-toastify";


const ConfirmDeleteRental = () => {
    const [deleteRental, {isSuccess, isError, error}] = useDeleteRentalMutation();
    const [open, setOpen] = useState(false);
    const [book, setBook] = useState(null);
    const theme=useTheme();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Rental deleted successfully")
        } else if (isError) {
            const {data:fullError} = error;
            const {message} = fullError;
            toast.error(message)
        }
    }, [isError, isSuccess]);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleShow = (rent) => {
        const rental = {...rent};
        setBook(rental)
        handleClickOpen()
    }


    const handleClose = () => {
        setOpen(false);
        setBook(null);
    }

    const handleDelete = async () => {
        await deleteRental();
        handleClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure, Do you want to delete this rental ?"}
                </DialogTitle>
                <DialogContent>
                    Please be careful, You're about to delete this rental, this process is irreversible
                    You won't be able to undo this action. It will be deleted permanently
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{backgroundColor:theme.palette.buttons.main}}
                        variant="contained"
                        onClick={handleDelete}
                        color="error"
                    >
                        Delete
                    </Button>
                    <Button
                        sx={{backgroundColor:theme.palette.buttons.main}}
                        variant="contained"
                        onClick={handleClose}
                        color="success"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDeleteRental;