import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FormHelperText, TextField, Typography } from "@mui/material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";
import { useUpdateStudentMutation } from "../states/apiSlice";

// TO ADD A BOOLEAN TO MAKE FIELDS RED WHEN THERE IS AN ERROR

const EditPage = () => {
  const { studentId } = useParams();
  const navigate=useNavigate();
  const [updateStudent] = useUpdateStudentMutation();

  const [user, setUser] = useState({ name: "",fine:0 });

  // TAKES INPUT FROM INPUT FIELDS
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // SUBMITS DATA IN THE INPUTS FIELDS
  const handleSubmit =  async (event) => {
    event.preventDefault();
    const body={...user}
    await updateStudent({ body, studentId });
    console.log(user);
    setUser({ name: ""});
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
          Edit Student Info
        </Typography>
        <TextField
          required
          fullWidth
          name="name"
          placeholder=" Name"
          label="Name"
          type="text"
          id="name"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}

        />
        <TextField
          required
          fullWidth
          name="fine"
          placeholder="fine"
          label="Fine"
          type="number"
          id="fine"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}

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

export default EditPage;
