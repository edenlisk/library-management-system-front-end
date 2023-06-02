import React, {useEffect} from "react";
import {Box, Dialog, DialogActions, DialogTitle, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useUpdateLibrarianMutation} from "../../states/apiSlice";
import {toast} from "react-toastify";
import {useTheme} from "@emotion/react";
import {RotatingLines} from "react-loader-spinner";


const ConfirmSuspend = ({open, handleClose, librarian}) => {
    const theme = useTheme();
    const [updateLibrarian, {isLoading, isSuccess, isError, error}] = useUpdateLibrarianMutation();

    const handleChangeStatus = async () => {
        const body = {active: !librarian.active};
        await updateLibrarian({body, librarianId: librarian._id});
        handleClose();
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Settings updated successfully")
        } else if (isError) {
            const {data:fullError} = error;
            const {message} = fullError;
            toast.error(message);
        }
    }, [isSuccess, isError, error])

    return (
        <Box sx={{backgroundColor: 'inherit'}}>
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
                        {
                            librarian ?.active ===  true
                                ? `ARE YOU SURE, DO YOU WANT TO SUSPEND THIS LIBRARIAN ?, HE/SHE WILL NOT BE ABLE TO SIGN IN AGAIN UNTIL RE-ACTIVATED`
                                : `ARE YOU SURE, DO YOU WANT TO RE-ACTIVATE THIS LIBRARIAN ?`
                        }
                    </Typography>
                </DialogTitle>
                <DialogActions sx={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <Button
                        variant="contained"
                        size="small"
                        color={librarian?.active === true ? "warning" : "success"}
                        onClick={handleChangeStatus}
                    >
                        {isLoading ?
                            <>
                                <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="17"
                                    visible={true}
                                />
                                Loading
                            </> : librarian?.active === true ? "Suspend" : "Activate"}
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

export default ConfirmSuspend;