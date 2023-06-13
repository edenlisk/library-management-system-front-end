import React, {useEffect} from "react";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {Bars} from "react-loader-spinner";
import { useLastCreatedQuery } from "../../states/apiSlice";

const LastCreated = () => {
    const { data, isLoading, isSuccess } = useLastCreatedQuery();
    let rows = [];
    if (isSuccess) {
        const { data:lastCreated } = data;
        const { rentals } = lastCreated;
        rows = rentals;
    }

    return (
        <div style={{margin: ''}}>
            <div style={{display: 'flex', justifyContent: 'center', margin: '1rem 0'}}>
                <Typography variant="h3">Last 10 Created Rentals</Typography>
            </div>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>BookId</TableCell>
                            <TableCell>Borrower</TableCell>
                            <TableCell>Name of book</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Issue date</TableCell>
                            <TableCell>Due date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ?
                                <TableRow >
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
                                rows.map((book, index) => {
                                    return (
                                        <TableRow key={index} hover>
                                            <TableCell><Typography fontWeight="bold">{index + 1}</Typography></TableCell>
                                            <TableCell><Typography fontWeight="bold">{book.bookId}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{book.studentName}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{book.nameOfBook}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{book.categoryName}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{book.issueDate}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{book.dueDate}</Typography></TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    )
}

export default LastCreated;