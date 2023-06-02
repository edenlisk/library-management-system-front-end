import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";
import {
  ChevronLeft,

} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useGetBookQuery, useUpdateBookMutation } from "../../states/apiSlice";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify";

const EditBookPage = () => {
    const{bookId}=useParams();
  const navigate = useNavigate();
  const [updateBook, {isSuccess, isError, error}]=useUpdateBookMutation();
  const {data:info, isLoading }=useGetBookQuery(bookId);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book updated successfully")
    } else if (isError) {
      const { data:fullError } = error;
      const {message} = fullError;
      toast.error(message);
    }
  }, [isError, isSuccess]);
  let singleBk=[];

  const [book, setBook] = useState({
    bookName: "",
    author: "",
    edition: "",
    numberOfBooks: "",
    academicLevel: "",
    categoryName: "",
    language: "",
  });

  useEffect(() => {
    if (isSuccess) {
      const { data: Bkdata } = info;
      const { book: Bk } = Bkdata;
      setBook({
        bookName: Bk.bookName,
        author: Bk.author,
        edition: Bk.edition,
        numberOfBooks: Bk.numberOfBooks,
        academicLevel: Bk.academicLevel,
        categoryName: Bk.categoryName,
        language: Bk.language,
      });
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body=book;
    await updateBook({body, bookId});
    navigate("/monthly");
    console.log(book);
    // setBook({bookName:"",author:"",edition:"",numberOfBooks:"",academicLevel:"",category:"",language:""});
  };
  const levels = ["S1", "S2", "S3", "S4", "S5", "S6", "AllEvels"];
  const languages = ["English", "French", "Kinyarwanda", "Swahili", "Other"];

  const categories=["Mathematics","Physics","Chemistry","Biology","Computer Science","Geography","Economics","Entrepreneurship","History",
  "Kinyarwanda","Kiswahili","English", "Literature","French","Novel","Others"];
  return (
    <Box component="form" sx={{ p: 4.5, pt:2 }}
    display="flex" flexDirection="column" gap="20px">
    <ChevronLeft  onClick={() => navigate(-1)} />
      <Grid2 container spacing={2}>
        <Grid2
          xs={12}
          container
          display="flex"
          justifyContent="start"
          alignItems="center"
        >
          <Grid2 xs={12} md={2}>
            <Typography variant="p">Book Name</Typography>
          </Grid2>
          <Grid2 xs={12} md={10}>
            <TextField
              label="Book"
              sx={{ width: "80%" }}
              name="bookName"
              id="bookName"
              type="text"
              variant="outlined"
              value={book.bookName || ""}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 xs={12} md={2}>
            <Typography variant="p">Author</Typography>
          </Grid2>
          <Grid2 xs={12} md={10}>
            <TextField
              label="Author"
              sx={{ width: "80%" }}
              name="author"
              id="author"
              type="text"
              variant="outlined"
              value={book.author || ""}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 xs={12} md={2}>
            <Typography variant="p">Edition</Typography>
          </Grid2>
          <Grid2 xs={12} md={10}>
            <TextField
              label="Edition"
              sx={{ width: "80%" }}
              name="edition"
              id="edition"
              type="text"
              variant="outlined"
              value={book.edition || ""}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 xs={12} md={2}>
            <Typography variant="p">Number of books</Typography>
          </Grid2>
          <Grid2 xs={12} md={10}>
            <TextField
              label="Number of books"
              sx={{ width: "80%" }}
              name="numberOfBooks"
              id="numberOfBooks"
              type="text"
              variant="outlined"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={book.numberOfBooks || ""}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 xs={12} md={2}>
            <Typography variant="p">Academic Level</Typography>
          </Grid2>
          <Grid2 xs={12} md={10}>
            {/* <FormControl variant="outlined" sx={{ width: "80%" }}>
              <InputLabel id="academicLevel">Academic Level </InputLabel>
              <Select
                required
                name="academicLevel"
                labelId="cacademicLevel"
                id="academicLevel"
                label="Academic Level"
                value={book.academicLevel}
                onChange={handleChange}
              >
                 {levels.map((levelz) => (
                <MenuItem key={levelz} value={levelz}>
                  {levelz}
                </MenuItem>
              ))}
              </Select>
            </FormControl> */}
            <TextField
                label="Academic Level"
                sx={{ width: "80%" }}
                name="academicLevel"
                id="academicLevel"
                type="text"
                variant="outlined"
                value={book.academicLevel || ""}
                onChange={handleChange}
              />
          </Grid2>

          <Grid2 xs={12} md={2}>
            <Typography variant="p">Category</Typography>
          </Grid2>
          <Grid2 xs={12} md={10}>
          <TextField
                label="Category name"
                sx={{ width: "80%" }}
                name="categoryName"
                id="categoryName"
                type="text"
                variant="outlined"
                value={book.categoryName || ""}
                onChange={handleChange}
              />
          </Grid2>
          <Grid2 xs={12} md={2}>
            <Typography variant="p">Language</Typography>
          </Grid2>
          <Grid2 xs={12} md={10}>
          <TextField
                label="Language"
                sx={{ width: "80%" }}
                name="language"
                id="language"
                type="text"
                variant="outlined"
                value={book.language || ""}
                onChange={handleChange}
              />
          </Grid2>

          <Grid2 container gap={2} display="flex">
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Edit book
            </Button>
            <Button variant="contained" type="button" onClick={() => navigate(-1)}>
              cancel
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default EditBookPage;
