import React, {useEffect, useState} from "react";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useSignupMutation, useUpdateLibrarianMutation, useGetLibrariansQuery} from "../../states/apiSlice";
import ConfirmSuspend from "./ConfirmSuspend";
import ConfirmDelete from "./ConfirmDelete";
import {Add} from "@mui/icons-material";
import LibrarianModal from "./LibrarianModal";
import {toast} from "react-toastify";
import EditLibrarian from "./EditLibrarian";
import {useNavigate} from 'react-router-dom';


const ManageLibrarians = () => {
    const navigate = useNavigate()
    const [signup, {
        isLoading: isCreating,
        isSuccess: isCreateSuccess,
        isError: isCreateError,
        error: createError
    }] = useSignupMutation();
    const {data, isLoading, isSuccess} = useGetLibrariansQuery();
    const [updateLibrarian, {
        isLoading: isUpdating,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateLibrarianMutation();
    const [openSuspend, setOpenSuspend] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [open, setOpen] = useState(false);
    const [targetLibrarian, setTargetLibrarian] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Librarian updated successfully")
        } else if (isUpdateError) {
            const {data:fullError} = updateError;
            const {message} = fullError;
            toast.error(message)
        }
    }, [isUpdateSuccess, isUpdateError, updateError]);

    const [librarian, setLibrarian] = useState(null);

    const handleClickOpenSuspend = () => {
        setOpenSuspend(true)
    }
    const handleClickOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleClose = () => {
        setOpenSuspend(false)
        setOpenDelete(false)
    }

    const handleSuspend = (librarian) => {
        setLibrarian(librarian)
        handleClickOpenSuspend()
    }
    const handleDelete = (lib) => {
        setLibrarian(lib);
        handleClickOpenDelete()
    }

    const [openModal, setOpenModal] = useState(false);

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        _id: ""
    });

    const handleOpenModal = () => {
        setOpenModal(!openModal);
    };

    const handleCloseModal = () => {
        setOpenModal(!openModal);
    };

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const body = {...user};
        await signup({body});
        setOpenModal(!openModal);
        setUser({
            name: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        })
    };

    useEffect(() => {
        if (isCreateSuccess) {
            toast.success("Librarian Added Successfully");
        } else if (isCreateError) {
            const {data: fullError} = createError;
            const {message} = fullError;
            toast.error(message);
        }
    }, [isCreateSuccess, isCreateError, createError]);

    let rows = [];
    if (isSuccess) {
        const {data: libraryInfo} = data;
        const {librarians} = libraryInfo;
        rows = librarians;
    }

    const handleClosePopup = () => {
        setOpen(!open);
    }

    const handleEdit = (lib) => {
        setTargetLibrarian({
            name: lib.name,
            username: lib.username,
            email: lib.email,
            password: "",
            passwordConfirm: "",
            _id: lib._id
        })
        handleClosePopup();
    }

    const modifyUser = (e) => {
        setTargetLibrarian({...targetLibrarian, [e.target.name]: e.target.value});
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const body = {...targetLibrarian}
        await updateLibrarian({body, librarianId: librarian._id});
        setLibrarian({
            name: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        })
        setOpen(!open);
    }

    const handleAssigningPermissions = (name, id) => {
        navigate(`/permissions/${name}/${id}`);
    }

    return (
        <>
            <Box display="flex" width="100%" justifyContent="end" pr="2rem">
                <Button
                    size="small"
                    variant="contained"
                    onClick={handleOpenModal}
                >
                    <Add/>
                    New
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Full name</TableCell>
                            <TableCell align="center">Username</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Suspend</TableCell>
                            <TableCell align="center">Permissions</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((lib, index) => {
                            return (
                                <TableRow key={lib._id} hover>
                                    <TableCell align="center"><Typography
                                        variant="h5">{index + 1}</Typography></TableCell>
                                    <TableCell align="center"><Typography
                                        variant="h5">{lib.name}</Typography></TableCell>
                                    <TableCell align="center"><Typography
                                        variant="h5">{lib.username}</Typography></TableCell>
                                    <TableCell align="center"><Typography
                                        variant="h5">{lib.email}</Typography></TableCell>
                                    <TableCell align="center"><Typography
                                        variant="h5">{lib.active === true ? 'Active' : 'Suspended'}</Typography></TableCell>
                                    <TableCell align="center"><Button
                                        color={lib.active === true ? "warning" : "success"} size="small"
                                        variant="contained"
                                        onClick={() => handleSuspend(lib)}>{lib.active === true ? "Suspend" : "Activate"}</Button></TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAssigningPermissions(lib.username, lib._id)}
                                        >
                                            Assign
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center"><Button color="info" variant="contained" size="small"
                                                                      onClick={() => {
                                                                          setLibrarian(lib)
                                                                          handleEdit(lib)
                                                                      }}>Edit</Button></TableCell>
                                    <TableCell align="center"><Button color="error" variant="contained" size="small"
                                                                      onClick={() => handleDelete(lib)}>Delete</Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditLibrarian handleClosePopup={handleClosePopup} open={open} targetLibrarian={targetLibrarian} isUpdating={isUpdating} modifyUser={modifyUser} handleUpdate={handleUpdate}/>
            <ConfirmDelete open={openDelete} handleClose={handleClose} librarian={librarian}/>
            <ConfirmSuspend open={openSuspend} handleClose={handleClose} librarian={librarian}/>
            <LibrarianModal openModal={openModal} isLoading={isCreating} handleCloseModal={handleCloseModal}
                            handleChange={handleChange} handleSubmit={handleSubmit} user={user}/>
        </>
    )
}

export default ManageLibrarians;
