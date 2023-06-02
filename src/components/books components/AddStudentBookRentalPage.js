import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Button,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { SearchOutlined, ChevronLeft } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import BooksCard from "./BooksCard";
import {
  useGetAllBooksQuery,
  useCreateRentalMutation,
} from "../../states/apiSlice";
import { toast } from "react-toastify";

const AddStudentBookRentalPage = () => {
  const { studentId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const academicYear = useSelector((state) => state.global.academicYear);

  const { data, isLoading, isSuccess } = useGetAllBooksQuery();
  const [
    createRental,
    { isSuccess: isCreateSuccess, isError: isCreateError, error: createError,isLoading:isSending },
  ] = useCreateRentalMutation();

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Rental created successfully");
    } else if (isCreateError) {
      const { data: fullError } = createError;
      const { message } = fullError;
      toast.error(message);
    }
  }, [isCreateError, isCreateSuccess]);

  {
    /* STATE FOR HANDLING BOOK SUBMITION ON BACKEND AND WHERE BOOK DATA ARE ASSED FROM BOOK-CARD */
  }
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    edition: "",
    numberOfBooks: "",
    academicLevel: "",
    // categoryName: "",
    categoryName: "",
    language: "",
    bookId: "",
    book_id: null,
    issueDate: null,
    dueDate: null,
  });
  const [rentBook, setRentBook] = useState(null);

  {
    /* STATE FOR HANDLING SELECT DROPDOWN VALUE SELECTED */
  }
  const [selectedValue, setSelectedvalue] = useState({
    academicLevel: "",
    category: "",
  });

  {
    /* STATE FOR HANDLING THE FILTERED ARRAY OBJECT BASING ON THE VALUE ON THE SELECTED  VALUE IN SELECT COMPONENTS*/
  }

  let rows = [];

  if (isSuccess) {
    const { data: allBooks } = data;
    const { books } = allBooks;
    console.log(books);
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
  //     language: "English",
  //     edition: "Kindle Edition",
  //     id: 1,
  //   },
  //   {
  //     bookName: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     category: "Action",
  //     academicLevel: "S6",
  //     totalBooks: "10",
  //     availableBook: "4",
  //     language: "French",
  //     edition: "French Edition 1998",
  //     id: 2,
  //   },
  //   {
  //     bookName: "The Lord of the Rings",
  //     author: "J. R. R. Tolkien",
  //     category: "Fantasy",
  //     academicLevel: "S4",
  //     totalBooks: "11",
  //     availableBook: "8",
  //     language: "English",
  //     edition: "The Rings of Power 1954",
  //     id: 3,
  //   },
  //   {
  //     bookName: "Animal Farm",
  //     author: "George Orwell",
  //     category: "History",
  //     academicLevel: "S2",
  //     totalBooks: "10",
  //     availableBook: "2",
  //     language: "Danish",
  //     edition: "A Fairy Story 1944",
  //     id: 4,
  //   },
  //   {
  //     bookName: "Pride and Prejudice",
  //     author: "Jane Austen",
  //     category: "Romance",
  //     academicLevel: "S2",
  //     totalBooks: "30",
  //     availableBook: "12",
  //     language: "Spanish",
  //     edition: "Deluxe edition(Spanish) 1813",
  //     id: 5,
  //   },
  //   {
  //     bookName: "Beloved",
  //     author: "Toni Morrison",
  //     category: "Novel",
  //     academicLevel: "S1",
  //     totalBooks: "15",
  //     availableBook: "7",
  //     language: "English",
  //     edition: "Paperback 1987",
  //     id: 6,
  //   },
  // ];

  const [filteredProducts, setFilteredProducts] = useState(rows);

  const filteredObject = rows.filter(
    (filteredrowz) =>
      filteredrowz.academicLevel
        .toLowerCase()
        .includes(selectedValue.academicLevel.toLowerCase()) &&
      filteredrowz.categoryName
        .toLowerCase()
        .includes(selectedValue.category.toLowerCase())
  );

  {
    /* STATE FOR CHECKING IF THERE IS FILTER*/
  }

  const [isFiltered, setIsFiltered] = useState(false);

  {
    /* FUNCTION HANDLING FILTERING IN THE SELECT COMPONENT */
  }
  const handleFilter = (event) => {
    setSelectedvalue({
      ...selectedValue,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  {
    /* FUNCTION TO HANDLE ISUED DATE ON THE RENT BOOK FORM */
  }
  const handleStartDateChange = (newDate) => {
    setBook((prevState) => ({
      ...prevState,
      // issueDate: newDate.format("MM/DD/YYYY"),
      issueDate: newDate.format("YYYY-MM-DD"),
    }));
    setRentBook((prevRentBook) => ({
      ...prevRentBook,
      issueDate: newDate.format("YYYY-MM-DD"),
    }));
  };

  {
    /* FUNCTION TO HANDLE ISUED DATE ON THE RENT BOOK FORM*/
  }
  const handleEndDateChange = (newDate) => {
    setBook((prevState) => ({
      ...prevState,
      // dueDate: newDate.format("MM/DD/YYYY"),
      dueDate: newDate.format("YYYY-MM-DD"),
    }));

    setRentBook((prevRentBook) => ({
      ...prevRentBook,
      dueDate: newDate.format("YYYY-MM-DD"),
    }));
  };

  {
    /*FUNCTION TO HANDLE ANY CHANGE IN THE RENTAL BOOK FORM EXCPET ISSUE AND DUE DATES */
  }
  const handleChange = (e) => {
    setBook((prevBook) => ({
      ...prevBook,
      [e.target.name]: e.target.value,
    }));

    setRentBook((prevRentBook) => ({
      book_id: book.book_id,
      ...prevRentBook,
      [e.target.name]: e.target.value,
    }));
  };

  {
    /* FUNCTION TO HANDLE FORM DATA SUBMISSION (BOOK)*/
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { ...rentBook };
    await createRental({ body, academicYear, studentId });
    console.log(book);
    console.log(rentBook);
    setBook({
      bookName: "",
      author: "",
      edition: "",
      numberOfBooks: "",
      academicLevel: "",
      categoryName: "",
      language: "",
      bookId: "",
      book_id: null,
      issueDate: null,
      dueDate: null,
    });
    navigate(-1);
  };

  const levels = ["S1", "S2", "S3", "S4", "S5", "S6", "AllEvels"];

  const categories = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Geography",
    "Economics",
    "Entrepreneurship",
    "History",
    "Kinyarwanda",
    "Kiswahili",
    "English",
    "Literature",
    "French",
    "Novel",
    "Romance",
    "Fantasy",
    "Action",
    "Others",
  ];

  {
    /* FUNCTION TO HANDLE CARD CLICK TO PASS IN THE BOOK CARD DATA TO THE RENTAL BOOK FORM*/
  }
  const cardClick = (id) => {
    const clickedBook = rows.find((book) => book._id === id);
    if (clickedBook) {
      setBook({
        bookName: clickedBook.bookName,
        author: clickedBook.author,
        edition: clickedBook.edition,
        academicLevel: clickedBook.academicLevel,
        categoryName: clickedBook.categoryName,
        language: clickedBook.language,
        book_id: clickedBook._id,
      });
    }
    console.log(id);
  };
  return (
    <>
    <Box  sx={{ padding:'4px 8px 4px 33px' }} >
      <ChevronLeft onClick={() => navigate(-1)} />
    </Box>
      {/* FILTERING CONTAINER */}
      <Grid2
        container
        spacing={2}
        sx={{
          padding: '8px 8px 8px 36px',
          mt: 0.2,
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "55px",
          },
          boxShadow: "0.5px 0px 7px #ccc",
        }}
        alignItems="center"
        backgroundColor={theme.palette.background.alt}
        disableEqualOverflow
      >
        {/* GRID CONTAINING SEARCH AND SLECT COMPONENTS USING FOR FILTERING PURPOSES */}
        <Grid2
          xs={12}
          md={8}
          lg={6}
          display="flex"
          gap={2}
          sx={{p:0}}
          justifyContent="start"
          alignItems="center"
          disableEqualOverflow
        >
          <TextField
            variant="outlined"
            label="Search Book"
            sx={{ width: "80%" }}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton>
            //       <SearchOutlined />
            //     </IconButton>
            //   </InputAdornment>
            // }
          />
          <FormControl variant="outlined" sx={{ width: "80%" }}>
            <InputLabel id="academicLevel">Academic Level </InputLabel>
            <Select
              required
              name="academicLevel"
              labelId="cacademicLevel"
              id="academicLevel"
              label="Academic Level"
              value={selectedValue.academicLevel || ""}
              onChange={handleFilter}
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ width: "80%" }}>
            <InputLabel id="category">Book Category</InputLabel>
            <Select
              required
              name="category"
              labelId="category"
              id="category"
              label="Book Category"
              value={selectedValue.category || ""}
              onChange={handleFilter}
              // onChange={handleChange}
            >
              {categories.map((categoriez) => (
                <MenuItem key={categoriez} value={categoriez}>
                  {categoriez}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
      {/* GRID CONTAINING SEARCH AND SLECT COMPONENTS USING FOR FILTERING PURPOSES */}

      {/* GRID CONTAINING THE 2 GRIDS FOR BOOK CARDS AND THE RENTAL BOOK FORM */}
      <Grid2 container sx={{ p: 4.5 }} spacing={2} disableEqualOverflow>
        {/* GRID CONTAINING THE BOOK AVAILABLE CARDS USE WITH THE MAPING AFTER OR BEFORE FITLTER */}
        <Grid2 xs={12} md={6} sx={{ height: '100vh', overflow: 'auto' }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="7.5px"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              padding:'0px 5.5px 0px 0px'
            }}
          >
            {/* {rows.map(({ bookName, author, category, academicLevel,language, id }) => (
              <BooksCard
                bookName={bookName}
                author={author}
                category={category}
                academicLevel={academicLevel}
                language={language}
                id={id}
                cardClick={() => cardClick(id)}
                key={id}
              />
            ))} */}
            {filteredObject.map(
              ({
                bookName,
                author,
                categoryName,
                academicLevel,
                language,
                _id,
              }) => (
                <BooksCard
                  bookName={bookName}
                  author={author}
                  category={categoryName}
                  academicLevel={academicLevel}
                  language={language}
                  id={_id}
                  cardClick={() => cardClick(_id)}
                  key={_id}
                />
              )
            )}
          </Box>
        </Grid2>
        {/* GRID CONTAINING THE BOOK AVAILABLE CARDS USE WITH THE MAPING AFTER OR BEFORE FITLTER */}

        {/* GRID CONTAINING PRE FILLING RENTAL BOOK FORM  */}
        <Grid2 xs={12} md={6} spacing={2}>
          <Grid2 container component="form" spacing={2} columns={12}>
            <Grid2 xs={12} md={3}>
              <Typography variant="p">Book Name</Typography>
            </Grid2>
            <Grid2 xs={12} md={9}>
              <TextField
                label="Book Name"
                sx={{ width: "80%" }}
                name="bookName"
                id="bookName"
                type="text"
                variant="outlined"
                disabled
                value={book.bookName || ""}
                onChange={handleChange}
              />
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Typography variant="p">Author</Typography>
            </Grid2>
            <Grid2 xs={12} md={9}>
              <TextField
                label="Author"
                sx={{ width: "80%" }}
                name="author"
                id="author"
                type="text"
                variant="outlined"
                disabled
                value={book.author || ""}
                onChange={handleChange}
              />
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Typography variant="p">Edition</Typography>
            </Grid2>
            <Grid2 xs={12} md={9}>
              <TextField
                label="Edition"
                sx={{ width: "80%" }}
                name="edition"
                id="edition"
                type="text"
                variant="outlined"
                disabled
                value={book.edition || ""}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 xs={12} md={3}>
              <Typography variant="p">Book ID</Typography>
            </Grid2>
            <Grid2 xs={12} md={9}>
              <TextField
                label="Book ID"
                sx={{ width: "80%" }}
                name="bookId"
                id="bookId"
                type="text"
                variant="outlined"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={book.bookId || ""}
                onChange={handleChange}
              />
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Typography variant="p">Issue date</Typography>
            </Grid2>
            <Grid2 xs={12} md={9}>
              <DatePicker
                disablePast
                disableFuture
                required
                value={book.issueDate || null}
                onChange={handleStartDateChange}
                format="YYYY-MM-DD"
                sx={{ width: "80%" }}
              />
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Typography variant="p">Due date</Typography>
            </Grid2>
            <Grid2 xs={12} md={9}>
              <DatePicker
                disablePast
                value={book.dueDate || null}
                onChange={handleEndDateChange}
                format="YYYY-MM-DD"
                sx={{ width: "80%" }}
              />
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Typography variant="p">Language</Typography>
            </Grid2>
            <Grid2 xs={12} md={9}>
              <TextField
                label="Language"
                sx={{ width: "80%" }}
                name="language"
                id="language"
                type="text"
                variant="outlined"
                disabled
                value={book.language || ""}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 xs={12} md={3}>
              <Typography variant="p">Category name</Typography>
            </Grid2>
            <Grid2 xs={12} md={9}>
              <TextField
                label="Category name"
                sx={{ width: "80%" }}
                name="categoryName"
                id="categoryName"
                type="text"
                variant="outlined"
                disabled
                value={book.categoryName || ""}
                onChange={handleChange}
              />
            </Grid2>

            <Grid2 xs={12} gap={2} display="flex" alignItems="center">
             {isSending? (<Button variant="contained" disabled={isSending}startIcon={<CircularProgress size={20}/> }>Renting</Button>) : (<Button variant="contained" type="submit" onClick={handleSubmit}>
                confirm & rent
              </Button>)}
              <Button
                variant="contained"
                type="button"
                onClick={() => navigate(-1)}
              >
                cancel
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
        {/* GRID CONTAINING PRE FILLING RENTAL BOOK FORM */}
      </Grid2>
      {/* GRID CONTAINING THE 2 GRIDS FOR BOOK CARDS AND THE RENTAL BOOK FORM */}
    </>
  );
};

export default AddStudentBookRentalPage;
