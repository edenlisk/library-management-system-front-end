import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import Customtoolbar from "../Customtoolbar";
import { useGetAllBooksQuery } from "../../states/apiSlice";
import { Link } from "react-router-dom";

const BooksPage = () => {
  const{data, isLoading, isSuccess, isError, error }=useGetAllBooksQuery();
  const theme = useTheme();
  const columns = [
    { field: "bookName", headerName: "Book name", flex: 0.3 },
    { field: "author", headerName: "Author", flex: 0.2 },
    { field: "categoryName", headerName: "category", flex: 0.2 },
    { field: "academicLevel", headerName: "Level", flex: 0.2 },
    { field: "numberOfBooks", headerName: "No. Books", flex: 0.2 },
    { field: "availableCopy", headerName: "Avail. Book", flex: 0.2 },
    {
      field: "edit",
      headerName: "edit",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <Link to={`/edit-book/${params.row._id}`}>
                    <Button
            variant="contained"
            // color="info"
            onClick={() => console.log(params.row._id)}
            size="small"
          >
            edit
          </Button>
          </Link>

        );
      },
    },
  ];

  let rows=[];

  if (isSuccess) {
    const { data: allBooks } = data;
    const { books } = allBooks;
    rows = books;
  }

  // const rows = [
  //   {
  //     bookName: "The Great Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     category: "Novel",
  //     academicLevel: "S5",
  //     totalBooks: "20",
  //     availableBook: "12",
  //     id: 1,
  //   },
  //   {
  //     bookName: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     category: "Action",
  //     academicLevel: "S6",
  //     totalBooks: "10",
  //     availableBook: "4",
  //     id: 2,
  //   },
  //   {
  //     bookName: "The Lord of the Rings",
  //     author: "J. R. R. Tolkien",
  //     category: "Fantasy",
  //     academicLevel: "S4",
  //     totalBooks: "11",
  //     availableBook: "8",
  //     id: 3,
  //   },
  //   {
  //     bookName: "Animal Farm",
  //     author: "George Orwell",
  //     category: "History",
  //     academicLevel: "S2",
  //     totalBooks: "10",
  //     availableBook: "2",
  //     id: 4,
  //   },
  //   {
  //     bookName: "Pride and Prejudice",
  //     author: "Jane Austen",
  //     category: "Action",
  //     academicLevel: "S2",
  //     totalBooks: "30",
  //     availableBook: "12",
  //     id: 5,
  //   },
  //   {
  //     bookName: "Beloved",
  //     author: "Toni Morrison",
  //     category: "Novel",
  //     academicLevel: "S1",
  //     totalBooks: "15",
  //     availableBook: "7",
  //     id: 6,
  //   },
  // ];
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
          Toolbar: () => <Customtoolbar />,
        }}
      />
    </Box>
  );
};

export default BooksPage;
