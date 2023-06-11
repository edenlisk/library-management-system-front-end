import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Modal,
  useTheme,
  Fade,
  CircularProgress,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  useGetAllCategoriesQuery,
  useCreateBookMutation,
} from "../../states/apiSlice";
import { toast } from "react-toastify";

const AddBook = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  let categrz = [];
  const [createBook, { isSuccess, isError, error, isLoading: isSending }] =
    useCreateBookMutation();
  const { data: catz, isSuccess: isbookcatz } = useGetAllCategoriesQuery();

  const [book, setBook] = useState({
    bookName: "",
    author: "",
    edition: "",
    numberOfBooks: "",
    academicLevel: "",
    categoryName: "",
    language: "",
  });

  if (isbookcatz) {
    const { data } = catz;
    const { categories: catgz } = data;
    categrz = catgz;
    console.log(catgz);
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Book added successfully");
    } else if (isError) {
      const { data: fullError } = error;
      const { message } = fullError;
      toast.error(message);
    }
  }, [isError, isSuccess]);

  const handleModalClose = () => {
    setBook({
      bookName: "",
      author: "",
      edition: "",
      numberOfBooks: "",
      academicLevel: "",
      categoryName: "",
      language: "",
    });

    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { ...book };
    await createBook(body);
    setIsOpen(!isOpen);
    console.log(book);
    setBook({
      bookName: "",
      author: "",
      edition: "",
      numberOfBooks: "",
      academicLevel: "",
      category: "",
      language: "",
    });
  };
  const levels = ["S1", "S2", "S3", "S4", "S5", "S6", "AllEvels"];
  const languages = ["English", "French", "Kinyarwanda", "Swahili", "Other"];

  return (
    <Modal
      open={isOpen}
      aria-labelledby="add-modal-title"
      aria-describedby="add-modal-description"
    >
      <Fade in={isOpen}>
        
          <Box
            component="form"
            sx={{
              p: 4.5,
              pt: 2,
              width: "70%",
              height:"100%",
              display: "flex",
              margin:"auto",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              borderRadius:"12px",
            }}
            backgroundColor={theme.palette.primary[900]}
            onSubmit={handleSubmit}
          >
            <CloseOutlined
              sx={{ alignSelf: "end", padding: "0px 0px 3px 3px" }}
              onClick={handleModalClose}
            />

            <Typography variant="h2">Add new Book</Typography>
            <Grid2 container spacing={2}>
              <Grid2
                xs={12}
                container
                display="flex"
                justifyContent="start"
                alignItems="center"
              >
                <Grid2 xs={4} md={2}>
                  <Typography variant="p">Book Name</Typography>
                </Grid2>
                <Grid2 xs={8} md={10}>
                  <TextField
                    label="Book"
                    sx={{ width: "80%" }}
                    name="bookName"
                    id="bookName"
                    type="text"
                    variant="outlined"
                    value={book.bookName}
                    onChange={handleChange}
                  />
                </Grid2>

                <Grid2 xs={4} md={2}>
                  <Typography variant="p">Author</Typography>
                </Grid2>
                <Grid2 xs={8} md={10}>
                  <TextField
                    label="Author"
                    sx={{ width: "80%" }}
                    name="author"
                    id="author"
                    type="text"
                    variant="outlined"
                    value={book.author}
                    onChange={handleChange}
                  />
                </Grid2>

                <Grid2 xs={4} md={2}>
                  <Typography variant="p">Edition</Typography>
                </Grid2>
                <Grid2 xs={8} md={10}>
                  <TextField
                    label="Edition"
                    sx={{ width: "80%" }}
                    name="edition"
                    id="edition"
                    type="text"
                    variant="outlined"
                    value={book.edition}
                    onChange={handleChange}
                  />
                </Grid2>

                <Grid2 xs={4} md={2}>
                  <Typography variant="p">Number of books</Typography>
                </Grid2>
                <Grid2 xs={8} md={10}>
                  <TextField
                    label="Number of books"
                    sx={{ width: "80%" }}
                    name="numberOfBooks"
                    id="numberOfBooks"
                    type="text"
                    variant="outlined"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    value={book.numberOfBooks}
                    onChange={handleChange}
                  />
                </Grid2>

                <Grid2 xs={4} md={2}>
                  <Typography variant="p">Academic Level</Typography>
                </Grid2>
                <Grid2 xs={8} md={10}>
                  <FormControl variant="outlined" sx={{ width: "80%" }}>
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
                  </FormControl>
                </Grid2>

                <Grid2 xs={4} md={2}>
                  <Typography variant="p">Category</Typography>
                </Grid2>
                <Grid2 xs={8} md={10}>
                  <FormControl variant="outlined" sx={{ width: "80%" }}>
                    <InputLabel id="categoryName">Book Category</InputLabel>
                    <Select
                      required
                      name="categoryName"
                      labelId="categoryName"
                      id="categoryName"
                      label="Book Category"
                      value={book.categoryName}
                      onChange={handleChange}
                      // onChange={handleChange}
                    >
                      {categrz.map(({ _id, categoryName }) => (
                        <MenuItem key={_id} value={categoryName}>
                          {categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 xs={4} md={2}>
                  <Typography variant="p">Language</Typography>
                </Grid2>
                <Grid2 xs={8} md={10}>
                  <FormControl variant="outlined" sx={{ width: "80%" }}>
                    <InputLabel id="Language">Language</InputLabel>
                    <Select
                      required
                      name="language"
                      labelId="language"
                      id="language"
                      label="Language"
                      value={book.language}
                      onChange={handleChange}
                      // onChange={handleChange}
                    >
                      {languages.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                          {lang}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2 container xs={12} gap={2} display="flex" justifyContent="center">
                  {isSending ? (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled
                      startIcon={<CircularProgress size={20} />}
                    >
                      Adding
                    </Button>
                  ) : (
                    <Button variant="contained" type="submit">
                      Add book
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    type="button"
                    onClick={handleModalClose}
                  >
                    cancel
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Box>
       
      </Fade>
    </Modal>
  );
};

export default AddBook;
