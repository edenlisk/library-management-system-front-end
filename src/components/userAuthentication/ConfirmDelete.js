import React, {useEffect} from "react";
import {Box, Dialog, DialogActions, DialogTitle, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useTheme} from "@emotion/react";
import {useDeleteLibrarianMutation} from "../../states/apiSlice";
import {toast} from "react-toastify";
import {RotatingLines} from "react-loader-spinner";


const ConfirmDelete = ({open, handleClose, librarian}) => {
    const theme = useTheme();
    const [deleteLibrarian, {isLoading, isSuccess, isError, error}] = useDeleteLibrarianMutation();

    const handleDelete = async () => {
        await deleteLibrarian(librarian._id);
        handleClose();
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Librarian deleted successfully");
        } else if (isError) {
            const {data} = error;
            const {message} = data;
            toast.error(message);
        }
    }, [isSuccess, isError, error]);

    return (
        <Box>
            <Dialog
                open={open}
                maxWidth="md"
                PaperProps={{
                    style: {
                        width: '50%',
                        maxWidth: 'none',
                        height: '20%',
                        backgroundColor: theme.palette.primary[800],
                        fontSize: 24
                    }
                }}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle align="center">
                    <Typography>
                        {`DO YOU WANT TO DELETE THIS LIBRARIAN: ${librarian?.name ? librarian.name : ''}`}
                    </Typography>
                </DialogTitle>
                <DialogActions sx={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleDelete}
                    >
                        {isLoading ?
                            <>
                                <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="19"
                                    visible={true}
                                />
                                Deleting
                            </> : `Delete`
                        }
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={handleClose}
                    >
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>

    )
}

export default ConfirmDelete;