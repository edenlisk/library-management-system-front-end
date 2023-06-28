import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useGetBookQuery } from "../../states/apiSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose, bookId }) {
  const theme = useTheme();
  const { data, isLoading, isSuccess } = useGetBookQuery(bookId);
  let book;
  if (isSuccess) {
    const { data: bookInfo } = data;
    const { book: bk } = bookInfo;
    book = bk;
  }

  return (
    <div>
      {/*<Button variant="contained" onClick={handleClickOpen}>Open Dialog</Button>*/}
      <Dialog
        open={open}
        maxWidth="md"
        PaperProps={{
          style: {
            width: "60%",
            maxWidth: "none",
            height: "90%",
            backgroundColor:theme.palette.primary[900],
            fontSize: 26,
          },
        }}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        {/*<DialogTitle sx={{fontSize: '30px'}}>*/}
        {/*    The selected book has the following details*/}
        {/*</DialogTitle>*/}
        <DialogContent>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="h5">Id</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{book ? book._id : ""}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell>
                    <Typography variant="h5">Book name</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h5">
                      {book ? book.bookName : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="h5">Author</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h5">
                      {book ? book.author : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="h5">Category</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h5">
                      {book ? book.categoryName : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="h5">Academic Level</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h5">
                      {book ? book.academicLevel : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="h5">Language</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h5">
                      {book ? book.language : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="h5">Number of Books</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h5">
                      {book ? book.numberOfBooks : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="h5">Available Copies</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">
                      {book ? book.availableCopy : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>
                    <Typography variant="h5">Number of Rentals</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">
                      {book ? book.numberOfRentals : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          {/*<Button variant="contained" color="success" onClick={handleClose}>Receive</Button>*/}
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
