import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import Customtoolbar from "../Customtoolbar";
import { Add } from "@mui/icons-material";
import { useGetAllBooksQuery } from "../../states/apiSlice";
import AlertDialogSlide from "./ShowBook";
import BooksToolbar from "./BooksToolbar";
import { Link } from "react-router-dom";
import AddBook from "./AddBook";

const BooksList = () => {
  const theme = useTheme();

  const [bookId, setBookId] = useState("");

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleModalOpen=()=>{
    setIsOpen(!isOpen);
  }
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
    {
      field: "Edit",
      headerName: "Edit",
      flex: 0.1,
      renderCell: (params) => {
        return (
            <Link to={`/edit-book/${params.row._id}`}>
          <Button
            variant="contained"
            color="info"
            onClick={() => console.log(params.row.bookName)}
            size="small"
          >
            Edit
          </Button>
          </Link>
        );
      },
    },
    {
      field: "Show",
      headerName: "Show",
      flex: 0.1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleShow(params.row._id)}
            size="small"
          >
            Show
          </Button>
        );
      },
    },
  ];

  let rows = [];
  if (isSuccess) {
    const { data: allBooks } = data;
    const { books } = allBooks;
    rows = books;
  }
  return (
    <Box sx={{ p: 4.5, width: "100%", display: "flex",flexDirection:"column" }}>
       <Button size="small" sx={{ display: "flex",border:"solid 1.5px",textTransform:"none",
      color:"inherit",padding:"8px",alignSelf:"end" }} onClick={handleModalOpen}>
          <Add />
        Add new book...
      </Button>
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
      <AddBook isOpen={isOpen}
      setIsOpen={setIsOpen}/>
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

export default BooksList;
