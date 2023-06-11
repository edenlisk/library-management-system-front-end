import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import { useLostBooksQuery } from "../../states/apiSlice";
import ReceiveBook from "./ReceiveBook";
import LostBooksToolBar from "./LostBooksToolBar";

const LostBooks = () => {
  const { data, isLoading, isSuccess, isError, error } = useLostBooksQuery();

  const theme = useTheme();

  const [book, setBook] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleShow = (bk) => {
    const rental = {...bk}
    setBook(rental);
    handleClickOpen();
  };

  const handleClose = () => {
    setOpen(false);
    setBook(null);
  };

  const columns = [
    { field: "bookId", headerName: "Id", flex: 0.12 },
    { field: "nameOfBook", headerName: "Book name", flex: 0.2 },
    // { field: "author", headerName: "Author", flex: 0.3 },
    { field: "issueDate", headerName: "issue date", flex: 0.16 },
    // { field: "dueDate", headerName: "due date", flex: 0.16 },
    { field: "rentalFor", headerName: "borrower", flex: 0.3 },
    { field: "className", headerName: "class", flex: 0.1, },
    {
      field: "receive",
      headerName: "Receive",
      flex: 0.1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="info"
            onClick={() => handleShow(params.row)}
            size="small"
          >
            Receive
          </Button>
        );
      },
    },
  ];

  let rows = [];
  if (isSuccess) {
    const { data: allBooks } = data;
    const { rentals } = allBooks;
    rows = rentals;
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
        width="100%"
        components={{
          Toolbar: () => <LostBooksToolBar />,
        }}
      />
      {book ? (
        <ReceiveBook handleClose={handleClose} open={open} book={book} />
      ) : (
        <div />
      )}
    </Box>
  );
};

export default LostBooks;
