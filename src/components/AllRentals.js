import {Box, Button, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useGetAllBooksQuery, useIssuedBooksQuery} from "../states/apiSlice";
import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import BooksToolbar from "./books components/BooksToolbar";
import AlertDialogSlide from "./books components/ShowBook";
import ShowRentalDetails from "./books components/ShowRentalDetails";
import LostBooksToolBar from "./books components/LostBooksToolBar";
import {useSelector} from "react-redux";

////////////////////////////// DEBUG
const AllRentals = () => {
    const theme = useTheme();


    const [open, setOpen] = useState(false);
    const [rental, setRental] = useState(null);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleShow = (rental) => {
        setRental(rental);
        handleClickOpen();
    };
    const handleClose = () => {
        setOpen(false);
        setRental(null);
    };


    const columns = [
        {field: "nameOfBook", headerName: "Book name", flex: 0.4},
        {field: "categoryName", headerName: "category", flex: 0.17},
        {field: "academicLevel", headerName: "Level", flex: 0.17},
        {field: "rentalFor", headerName: "Borrower", flex: 0.3},
        {field: "className", headerName: "Class", flex: 0.12},
        {
            field: "Show",
            headerName: "Show",
            renderCell: ({row}) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => handleShow(row)}
                    >
                        Show
                    </Button>
                )
            }
        }
    ]
    const academicYear = useSelector(state => state.global.academicYear);
    const {data, isLoading, isSuccess, isError, error} = useIssuedBooksQuery(academicYear);

    const handleGetAllRentals = async () => {
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = new Date().toISOString().split('T')[0];
    }
    let rows = [];
    if (isSuccess) {
        const {allRentals} = data.data;
        rows = allRentals;
    }


    return (
        <Box sx={{p: 4.5, width: "100%"}}>
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
                    Toolbar: () => <LostBooksToolBar/>,
                }}
            />
            {rental ? <ShowRentalDetails rental={rental} handleClose={handleClose} open={open}/> : <div/>}
        </Box>
    );
};

export default AllRentals;