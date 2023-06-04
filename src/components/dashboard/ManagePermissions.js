import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography, Checkbox
} from "@mui/material";
import {useUpdateLibrarianMutation, useGetLibrarianQuery} from "../../states/apiSlice";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";


const ManagePermissions = () => {
    const [updateLibrarian, {
        isLoading: isUpdating,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateLibrarianMutation();
    const {librarianId, name} = useParams();
    const {data, isLoading, isSuccess, isError, error} = useGetLibrarianQuery(librarianId);

    const [students, setStudents] = useState({add: false, edit:false, delete:false});
    const [rentals, setRentals] = useState({add: false, edit: false, delete: false});
    const [librarians, setLibrarians] = useState({add: false, edit: false, delete: false});
    const [settings, setSettings] = useState({add: false, edit: false, delete: false});

    useEffect(() => {
        if (isSuccess) {
            const {data: librarianInfo} = data;
            const {librarian} = librarianInfo
            const {role} = librarian;
            setSettings(role.settings);
            setLibrarians(role.librarians);
            setStudents(role.students);
            setRentals(role.rentals);
        }
    }, [isSuccess, data]);


    // let role;
    if (isSuccess) {
        const {data: librarianInfo} = data;
        const {librarian} = librarianInfo
        const {role} = librarian;
        // setSettings(role.settings);
        // setLibrarians(role.librarians);
        // setStudents(role.students);
        // setRentals(role.rentals);
    }

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Permissions updated successfully")
        } else if (isUpdateError) {
            const {data: fullError} = updateError;
            const {message} = fullError;
            toast.error(message);
        }
    }, [isUpdateSuccess, isUpdateError, updateError]);

    const handleSave = async () => {
        const role = {students, rentals, librarians, settings};
        const body = {role}
        await updateLibrarian({body, librarianId});
    }


    return (
        <Box>
            <Box display="flex" justifyContent="left">
                <Typography ml="1rem" variant="h4">{name}</Typography>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Permissions</TableCell>
                            <TableCell>Add</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><Typography variant="h5">Students</Typography></TableCell>
                            <TableCell>
                                {/*<TextField*/}
                                {/*    sx={{*/}
                                {/*        ".css-ume8vi-MuiInputBase-input-MuiInput-input": {*/}
                                {/*            height: "1em"*/}
                                {/*        }*/}
                                {/*    }}*/}
                                {/*    variant="standard"*/}
                                {/*    type="checkbox"*/}
                                {/*    onChange={() => setStudents(prevState => ({*/}
                                {/*        ...prevState,*/}
                                {/*        add: !prevState.add*/}
                                {/*    }))}*/}
                                {/*    // value={students.add}*/}
                                {/*    aria-checked={students.add}*/}
                                {/*/>*/}
                                <Checkbox
                                    checked={students.add}
                                    // value={students.add}
                                    onChange={() => setStudents(prevState => ({
                                        ...prevState,
                                        add: !prevState.add
                                    }))}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    onChange={() => setStudents(prevState => ({...prevState, edit: !prevState.edit}))}
                                    checked={students.edit}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    onChange={() => setStudents(prevState => ({
                                        ...prevState,
                                        delete: !prevState.delete
                                    }))}
                                    checked={students.delete}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant="h5">Librarians</Typography></TableCell>
                            <TableCell>
                                <Checkbox
                                    onChange={() => setLibrarians(prevState => ({
                                        ...prevState,
                                        add: !prevState.add
                                    }))}
                                    checked={librarians.add}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    onChange={() => setLibrarians(prevState => ({
                                        ...prevState,
                                        edit: !prevState.edit
                                    }))}
                                    checked={librarians.edit}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    onChange={() => setLibrarians(prevState => ({
                                        ...prevState,
                                        delete: !prevState.delete
                                    }))}
                                    checked={librarians.delete}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant="h5">Settings</Typography></TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={false}
                                    disabled
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    onChange={() => setSettings(prevState => ({
                                        ...prevState,
                                        edit: !prevState.edit
                                    }))}
                                    checked={settings.edit}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={false}
                                    disabled
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant="h5">Rentals</Typography></TableCell>
                            <TableCell>
                                <Checkbox
                                    onChange={() => setRentals(prevState => ({
                                        ...prevState,
                                        add: !prevState.add
                                    }))}
                                    checked={rentals.add}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    onChange={() => setRentals(prevState => ({
                                        ...prevState,
                                        edit: !prevState.edit
                                    }))}
                                    checked={rentals.edit}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <Checkbox
                                    onChange={() => setRentals(prevState => ({
                                        ...prevState,
                                        delete: !prevState.delete
                                    }))}
                                    checked={rentals.delete}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt='2rem' display="flex" justifyContent="center">
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSave}
                >
                    {isUpdating ? "Saving" : "Save"}
                </Button>
            </Box>
        </Box>

    )
}

export default ManagePermissions;