import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  FormHelperText,
  TextField,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LoginOutlined } from "@mui/icons-material";
import { useUpdateRentalMutation } from "../states/apiSlice";

// TO ADD A BOOLEAN TO MAKE FIELDS RED WHEN THERE IS AN ERROR

const EditRentalPage = () => {
  const { rentalId } = useParams();
  const navigate = useNavigate();
  const [updateRental] = useUpdateRentalMutation();

  const [rental, setRental] = useState({
    nameOfBook: "",
    bookId: "",
    dueDate: null,
    category: "",
    status: "",
  });

  // TAKES INPUT FROM INPUT FIELDS
  const handleChange = (e) => {
    setRental({ ...rental, [e.target.name]: e.target.value });
  };

  const handleEndDateChange = (newDate) => {
    setRental((prevState) => ({
      ...prevState,
      dueDate: newDate.format("MM/DD/YYYY"),
    }));
  };


  // SUBMITS DATA IN THE INPUTS FIELDS
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const body = { ...rental };
    // await updateRental({ body, rentalId });
    console.log(rental);
    setRental({
      nameOfBook: "",
      bookId: "",
      dueDate: null,
      category: "",
      status: "",
    });
    navigate(-1);
  };

  return (
    <Box height="100%">
      <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth={440}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="70%"
        margin="auto"
        p="10px 10px"
        boxShadow={"1.5px 1.5px 10px #ccc"}
        padding={2}
        borderRadius="7px"
        marginTop="20px"
      >
        <Typography variant="h3" sx={{ textAlign: "center", mb: 3 }}>
          Edit Rental Info
        </Typography>
        <TextField
          required
          fullWidth
          name="nameOfBook"
          placeholder=" nameOfBook"
          label="nameOfBook"
          type="text"
          id="nameOfBook"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          required
          fullWidth
          name="bookId"
          placeholder="bookId"
          label="bookId"
          type="number"
          id="bookId"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <DatePicker
          disablePast
          value={rental.dueDate}
          onChange={handleEndDateChange}
          format="MM/DD/YYYY"
          sx={{ minWidth: 230, alignSelf: "start", mb: 2 }}
        />
        <FormControl
          variant="outlined"
          sx={{ minWidth: 230, alignSelf: "start", mb: 4 }}
        >
          <InputLabel id="category">Book Category</InputLabel>
          <Select
            name="category"
            labelId="category"
            id="category"
            value={rental.category}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Others</em>
            </MenuItem>
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
            <MenuItem value="Chemistry">Chemistry</MenuItem>
            <MenuItem value="Biology">Biology</MenuItem>
            <MenuItem value="Geography">Geography</MenuItem>
            <MenuItem value="Economics">Economics</MenuItem>
            <MenuItem value="Entrepreneurship">Entrepreneurship</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Kinyarwanda">Kinyarwanda</MenuItem>
            <MenuItem value="Kiswahili">Kiswahili</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Literature">Literature</MenuItem>
            <MenuItem value="French">French</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="medium"
          type="submit"
          sx={{ mb: 2, width: "100px", alignSelf: "start" }}
          endIcon={<LoginOutlined />}
        >
          save
        </Button>
      </Box>
    </Box>
  );
};

export default EditRentalPage;
