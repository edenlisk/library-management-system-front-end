import React, {useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button} from "@mui/material"
import Customtoolbar from "../Customtoolbar";
import { useLostBooksQuery } from "../../states/apiSlice";
import ReceiveBook from "./ReceiveBook";
import BooksToolbar from "./BooksToolbar";

const LostBooks = () => {
    const { data, isLoading, isSuccess, isError, error } = useLostBooksQuery();

    const [book, setBook] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleShow = (bk) => {
        setBook(bk)
        handleClickOpen()
    }

    const handleClose = () => {
        setOpen(false);
        setBook(null);
    }

    const columns = [
        {field: "bookId", headerName: "Id", flex: 0.12},
        {field: "nameOfBook", headerName: "Book name", flex: 0.3},
        {field: "author", headerName: "Author", flex: 0.3},
        {field: "issueDate", headerName: "issue date", flex: 0.16},
        {field: "dueDate", headerName: "due date", flex: 0.16},
        {field: "rentalFor", headerName: "borrower", flex: 0.15},
        {field: "className", headerName: "class", flex: 0.15},
        {
            field: "receive",
            headerName: "Receive",
            flex: 0.1,
            renderCell: (params) => {
                return <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleShow(params.row)}
                    size="small"
                >
                    Receive
                </Button>
            }
        }
    ];

    let rows = [];
    if (isSuccess) {
        const {data: allBooks} = data;
        const { rentals } = allBooks;
        rows = rentals;
    }
    return (
        <Box sx={{p: 4.5, width: "100%"}}>
            <DataGrid
                columns={columns}
                rows={rows}
                getRowId={(row) => row._id}
                autoHeight
                components={{
                    Toolbar: () => <BooksToolbar />
                }}
            />
            {book ? <ReceiveBook handleClose={handleClose} open={open} book={book}/> : <div/>}
        </Box>
    );
};

export default LostBooks;