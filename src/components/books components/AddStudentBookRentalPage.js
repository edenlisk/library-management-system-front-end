import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams, Link} from "react-router-dom";
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
    CircularProgress,
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {SearchOutlined, ChevronLeft} from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import BooksCard from "./BooksCard";
import {
    useGetAllBooksQuery,
    useCreateRentalMutation,
    useGetAllCategoriesQuery,
} from "../../states/apiSlice";
import {toast} from "react-toastify";

const AddStudentBookRentalPage = () => {
    const {studentId} = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    let rows = [];
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    const academicYear = useSelector((state) => state.global.academicYear);

    const {data, isLoading, isSuccess} = useGetAllBooksQuery();
    const [
        createRental,
        {
            isSuccess: isCreateSuccess,
            isError: isCreateError,
            error: createError,
            isLoading: isSending,
        },
    ] = useCreateRentalMutation();
    const {data: catz, isSuccess: isbookcatz} = useGetAllCategoriesQuery();

    const [book, setBook] = useState({
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
    const [rentBook, setRentBook] = useState(null);

    const [selectedValue, setSelectedvalue] = useState({
        academicLevel: "",
        category: "",
    });

    const [search, setSearch] = useState("");

    const [filteredProducts, setFilteredProducts] = useState(rows);

    useEffect(() => {
        if (isCreateSuccess) {
            toast.success("Rental created successfully");
        } else if (isCreateError) {
            const {data: fullError} = createError;
            const {message} = fullError;
            toast.error(message);
        }
    }, [isCreateError, isCreateSuccess]);

    if (isSuccess) {
        const {data: allBooks} = data;
        const {books} = allBooks;
        console.log(books);
        rows = books;
    }

    let categrz = [];
    if (isbookcatz) {
        const {data} = catz;
        const {categories: catgz} = data;
        categrz = catgz;
        console.log(catgz);
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

    let filteredObject = rows.filter(
        (filteredrowz) =>
            filteredrowz.academicLevel
                .toLowerCase()
                .includes(selectedValue.academicLevel.toLowerCase()) &&
            filteredrowz.categoryName
                .toLowerCase()
                .includes(selectedValue.category.toLowerCase()) &&
            (filteredrowz.bookName.toLowerCase().includes(search.toLowerCase()) ||
                filteredrowz.academicLevel
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                filteredrowz.categoryName.toLowerCase().includes(search.toLowerCase()))
    );
    // filteredObject = filteredObject.filter(book =>
    //     book.bookName.toLowerCase().includes(search.toLowerCase()) ||
    //     book.academicLevel.toLowerCase().includes(search.toLowerCase()) ||
    //     book.category.toLowerCase().includes(search.toLowerCase())
    // )

    const handleSearch = (event) => {
        setSelectedvalue((prevState) => ({
            ...prevState,
            academicLevel: "",
            category: "",
        }));
        setSearch(event.target.value);
    };

    const [isFiltered, setIsFiltered] = useState(false);

    const handleFilter = (event) => {
        setSelectedvalue({
            ...selectedValue,
            [event.target.name]: event.target.value,
        });
        console.log(event.target.value);
    };

    const handleStartDateChange = (newDate) => {
        setBook((prevState) => ({
            ...prevState,
            issueDate: newDate.format("YYYY-MM-DD"),
        }));
        setRentBook((prevRentBook) => ({
            ...prevRentBook,
            issueDate: newDate.format("YYYY-MM-DD"),
        }));
    };

    const handleEndDateChange = (newDate) => {
        setBook((prevState) => ({
            ...prevState,
            dueDate: newDate.format("YYYY-MM-DD"),
        }));

        setRentBook((prevRentBook) => ({
            ...prevRentBook,
            dueDate: newDate.format("YYYY-MM-DD"),
        }));
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const body = {...rentBook};
        await createRental({body, academicYear, studentId});
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

    const levels = ["senor one", "senior two", "senior three", "senior four", "senior five", "senior six", "others"];

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
            <Box sx={{padding: "4px 8px 4px 33px"}}>
                <ChevronLeft onClick={() => navigate(-1)}/>
            </Box>

            <Grid2
                container
                spacing={2}
                sx={{
                    padding: "8px 8px 8px 36px",
                    mt: 0.2,
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "12px",
                    },
                }}
                alignItems="center"
                backgroundColor={theme.palette.background.alt}
                disableEqualOverflow
            >
                <Grid2
                    xs={12}
                    md={8}
                    lg={6}
                    display="flex"
                    gap={2}
                    sx={{p: 0}}
                    justifyContent="start"
                    alignItems="center"
                    disableEqualOverflow
                >
                    <TextField
                        variant="outlined"
                        label="Search Book"
                        sx={{width: "80%"}}
                        value={search}
                        onChange={handleSearch}
                        // endAdornment={
                        //   <InputAdornment position="end">
                        //     <IconButton>
                        //       <SearchOutlined />
                        //     </IconButton>
                        //   </InputAdornment>
                        // }
                    />
                    <FormControl variant="outlined" sx={{width: "80%"}}>
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

                    <FormControl variant="outlined" sx={{width: "80%"}}>
                        <InputLabel id="category">Book Category</InputLabel>
                        <Select
                            required
                            name="category"
                            labelId="category"
                            id="category"
                            label="Book Category"
                            value={selectedValue.category || ""}
                            onChange={handleFilter}
                        >
                            {categrz.map(({_id, categoryName}) => (
                                <MenuItem key={_id} value={categoryName}>
                                    {categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        sx={{textTransform: "none"}}
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            setSearch("");
                            setSelectedvalue((prevState) => ({
                                ...prevState,
                                academicLevel: "",
                                category: "",
                            }));
                        }}
                    >
                        Reset
                    </Button>
                </Grid2>
            </Grid2>

            <Grid2 container sx={{p: 4.5}} spacing={2} disableEqualOverflow>
                <Grid2
                    xs={12}
                    md={6}
                    sx={{
                        height: "100vh",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {isLoading ? (
                        <CircularProgress
                            sx={{alignSelf: "center", justifyContent: "center"}}
                        />
                    ) : (
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                            justifyContent="space-between"
                            rowGap="7.5px"
                            columnGap="1.33%"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                                padding: "0px 5.5px 0px 0px",
                            }}
                        >
                            {filteredObject.map(
                                ({
                                     bookName,
                                     author,
                                     categoryName,
                                     academicLevel,
                                     language,
                                     _id,
                                     numberOfBooks,
                                    availableCopy
                                 }) => (
                                    <BooksCard
                                        bookName={bookName}
                                        author={author}
                                        category={categoryName}
                                        academicLevel={academicLevel}
                                        language={language}
                                        numberOfBooks={numberOfBooks}
                                        availableCopy={availableCopy}
                                        id={_id}
                                        cardClick={() => cardClick(_id)}
                                        key={_id}
                                    />
                                )
                            )}
                        </Box>
                    )}
                </Grid2>

                <Grid2 xs={12} md={6} spacing={2}>
                    <Grid2 container component="form" spacing={2} columns={12} onSubmit={handleSubmit}>
                        <Grid2 xs={12} md={3}>
                            <Typography variant="p">Book Name</Typography>
                        </Grid2>
                        <Grid2 xs={12} md={9}>
                            <TextField
                                label="Book Name"
                                sx={{width: "80%"}}
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
                                sx={{width: "80%"}}
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
                                sx={{width: "80%"}}
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
                            required
                                label="Book ID"
                                sx={{width: "80%"}}
                                name="bookId"
                                id="bookId"
                                type="text"
                                variant="outlined"
                                inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
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
                                sx={{width: "80%"}}
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
                                sx={{width: "80%"}}
                            />
                        </Grid2>

                        <Grid2 xs={12} md={3}>
                            <Typography variant="p">Language</Typography>
                        </Grid2>
                        <Grid2 xs={12} md={9}>
                            <TextField
                                label="Language"
                                sx={{width: "80%"}}
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
                                sx={{width: "80%"}}
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
                            {isSending ? (
                                <Button
                                    variant="contained"
                                    disabled={isSending}
                                    startIcon={<CircularProgress size={20}/>}
                                >
                                    Renting
                                </Button>
                            ) : (
                                <Button
                                sx={{backgroundColor:theme.palette.buttons.main}}
                                    variant="contained"
                                    type="submit"
                                  
                                >
                                    confirm & rent
                                </Button>
                            )}
                            <Button
                            sx={{backgroundColor:theme.palette.buttons.main}}
                                variant="contained"
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                cancel
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default AddStudentBookRentalPage;
