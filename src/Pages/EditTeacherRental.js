import React, { useEffect, useState } from "react";
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
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LoginOutlined } from "@mui/icons-material";
import { useUpdateRentalMutation,useGetSingleTeacherRentalQuery } from "../states/apiSlice";

// TO ADD A BOOLEAN TO MAKE FIELDS RED WHEN THERE IS AN ERROR

const EditTeacherRentalPage = () => {
  const { rentalId } = useParams();
  const navigate = useNavigate();

  const{data,isLoading,isSuccess,isError,error}=useGetSingleTeacherRentalQuery(rentalId);


  const [rental, setRental] = useState({
    nameOfBook: "",
    dueDate: "",
  
  });
  useEffect(() => {
    if (isSuccess) {
      const { data: info } = data;
      const { rental:rentall } = info;
      setRental({
        nameOfBook: rentall.nameOfBook,
        dueDate: '',
      });
    }
  }, [isSuccess]);

  const [updateRental] = useUpdateRentalMutation();
  let  forminfo =[];

  
    // if (isSuccess) {
    //   const { data: info } = data;
    //   const{rental:rentals}=info;
    //   console.log(rentals);
    //   forminfo=rentals;
    // }

  

  // TAKES INPUT FROM INPUT FIELDS
  const handleChange = (e) => {
    setRental({ ...rental, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,});
  };

  const handleEndDateChange = (newDate) => {
    setRental((prevState) => ({
      ...prevState,
      dueDate: newDate.format("YYYY-MM-DD"),
    }));
  };


  // SUBMITS DATA IN THE INPUTS FIELDS
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { ...rental };
    await updateRental({ body, rentalId });
    console.log(rental);
    setRental({
      nameOfBook: "",
      dueDate: null,
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
        <Typography variant="h3" sx={{ textAlign: "center", pb: 3 }}>
          Edit Rental Info
        </Typography>
        <TextField
          required
          fullWidth
          defaultValue={rental.nameOfBook || ""}
          name="nameOfBook"
          // placeholder=" nameOfBook"
          // label="nameOfBook"
          type="text"
          id="nameOfBook"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <DatePicker
          disablePast
          value={rental.dueDate}
          onChange={handleEndDateChange}
          format="YYYY-MM-DD"
          sx={{ minWidth: 230, alignSelf: "start", mb: 2 }}
        />



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

export default EditTeacherRentalPage;
