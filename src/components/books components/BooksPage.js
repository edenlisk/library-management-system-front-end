import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material"
import Customtoolbar from "../Customtoolbar";

const BooksPage = () => {
  const columns = [
    { field: "bookName", headerName: "Book name", flex: 0.4 },
    { field: "author", headerName: "Author", flex: 0.3 },
    { field: "category", headerName: "category", flex: 0.3 },
    { field: "academicLevel", headerName: "Academic Level", flex: 0.4 },
    { field: "totalBooks", headerName: "total Books", flex: 0.4 },
    { field: "availableBook", headerName: "Available Book",flex:0.4 },
  ];

  const rows = [
    {
      bookName: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Novel",
      academicLevel: "S5",
      totalBooks: "20",
      availableBook: "12",
      id:1
    },
    {
      bookName: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Action",
      academicLevel: "S6",
      totalBooks: "10",
      availableBook: "4",
      id:2
    },
    {
      bookName: "The Lord of the Rings",
      author: "J. R. R. Tolkien",
      category: "Fantasy",
      academicLevel: "S4",
      totalBooks: "11",
      availableBook: "8",
      id:3
    },
    {
      bookName: "Animal Farm",
      author: "George Orwell",
      category: "History",
      academicLevel: "S2",
      totalBooks: "10",
      availableBook: "2",
      id:4
    },
    {
      bookName: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Action",
      academicLevel: "S2",
      totalBooks: "30",
      availableBook: "12",
      id:5
    },
    {
      bookName: "Beloved",
      author: "Toni Morrison",
      category: "Novel",
      academicLevel: "S1",
      totalBooks: "15",
      availableBook: "7",
      id:6
    },
  ];
  return (
    <Box sx={{ p: 4.5, width: "100%" }}>
      <DataGrid columns={columns} rows={rows}
      autoHeight
      components={{
        Toolbar: () => <Customtoolbar/>
      }} />
      
      
    </Box>
  );
};

export default BooksPage;
