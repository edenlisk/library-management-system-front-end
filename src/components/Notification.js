import React from "react";
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useNotificationQuery} from "../states/apiSlice";
import {Bars} from "react-loader-spinner";
import GenerateNotificationReport from "./GenerateNotificationReport";
import BookNotify  from "./BookNotify";

const Notification = () => {
    const {data, isSuccess, isLoading} = useNotificationQuery();

    let notification = [];
    if (isSuccess) {
        const {data: toBeNotified} = data;
        const {notify} = toBeNotified;
        notification = notify;
    }

    return (
        <div>
            <Box sx={{display: "flex", justifyContent: 'end', mr: '5rem',gap:"10px"}}>
                <GenerateNotificationReport />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Borrower</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Book Id</TableCell>
                            <TableCell>Name of book</TableCell>
                            <TableCell>Issue date</TableCell>
                            <TableCell>Due date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ?
                                <TableRow>
                                    <TableCell>
                                        {null}
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <Bars
                                            height="100"
                                            width="90"
                                            color="#FFE3A3"
                                            ariaLabel="bars-loading"
                                            visible={true}
                                        />
                                    </TableCell>
                                </TableRow>
                                :
                                notification.map((rent, index) => {
                                    return (
                                        <TableRow key={index} hover>
                                            <TableCell><Typography
                                                fontWeight="bold">{index + 1}</Typography></TableCell>
                                            <TableCell><Typography
                                                variant="h5">{rent.rentalFor ? rent.rentalFor : rent.model.charAt(0).toUpperCase() + rent.model.slice(1)}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{rent.className}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{rent.bookId}</Typography></TableCell>
                                            <TableCell><Typography
                                                variant="h5">{rent.nameOfBook.charAt(0).toUpperCase() + rent.nameOfBook.slice(1)}</Typography></TableCell>
                                            <TableCell><Typography
                                                variant="h5">{rent.issueDate}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{rent.dueDate}</Typography></TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <BookNotify/>
        </div>
    )
}


export default Notification;