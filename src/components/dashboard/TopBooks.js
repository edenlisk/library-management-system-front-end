import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Bars} from 'react-loader-spinner'
import {useTopBooksQuery} from "../../states/apiSlice";


const TopBooks = () => {
    const {data, isSuccess, isLoading} = useTopBooksQuery();
    let rows = [];
    if (isSuccess) {
        const {data: books} = data;
        const {topBooks} = books;
        rows = topBooks;
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}><Typography variant="h3">Top Books</Typography>
            </div>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name of Book</TableCell>
                            <TableCell>Number of rentals</TableCell>
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
                                        <TableRow key={book._id} hover>
                                            <TableCell><Typography fontWeight="bold">{index + 1}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{book.bookName}</Typography></TableCell>
                                            <TableCell sx={{textAlign: 'center'}}><Typography variant="h5">{book.numberOfRentals}</Typography></TableCell>
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


export default TopBooks;
