import {Box, Button, useTheme} from "@mui/material";
import React, {useState} from "react";
import {useGetAllBooksQuery} from "../states/apiSlice";
import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import BooksToolbar from "./books components/BooksToolbar";
import AlertDialogSlide from "./books components/ShowBook";

////////////////////////////// DEBUG
const AllRentals = () => {
    const theme = useTheme();

    const [bookId, setBookId] = useState("");

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleShow = (id) => {
        setBookId(id);
        handleClickOpen();
    };

    const handleClose = () => {
        setOpen(false);
        setBookId("");
    };
    const { data, isLoading, isSuccess, isError, error } = useGetAllBooksQuery();
    const columns = [
        { field: "bookName", headerName: "Book name", flex: 0.4 },
        { field: "author", headerName: "Author", flex: 0.3 },
        { field: "categoryName", headerName: "Category", flex: 0.14 },
        { field: "academicLevel", headerName: "Level", flex: 0.15 },
        { field: "numberOfBooks", headerName: "No. Books", flex: 0.15 },
        { field: "availableCopy", headerName: "Avail. Copies", flex: 0.15 },
    ];

    let rows = [];
    if (isSuccess) {
        const { data: allBooks } = data;
        const { books } = allBooks;
        rows = books;
    }
    return (
        <Box sx={{ p: 4.5, width: "100%" }}>
            <DataGrid
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.primary[800],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.primary[800],
                    },
                    "& .MuiDataGrid-virtualScroller": {},
                }}
                columns={columns}
                rows={rows}
                getRowId={(row) => row._id}
                loading={isLoading || !rows}
                autoHeight
                components={{
                    Toolbar: () => <BooksToolbar />,
                }}
            />
            {bookId ? (
                <AlertDialogSlide
                    handleClose={handleClose}
                    open={open}
                    bookId={bookId}
                />
            ) : (
                <div />
            )}
        </Box>
    );
};

export default AllRentals;