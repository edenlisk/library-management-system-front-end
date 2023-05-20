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
import { useUpdateStudentMutation,useGetOneStudentQuery } from "../states/apiSlice";

// TO ADD A BOOLEAN TO MAKE FIELDS RED WHEN THERE IS AN ERROR

const EditStudentPage = () => {
  const { studentId } = useParams();
  const navigate=useNavigate();
  const{data,isLoading,isSuccess,isError,error}=useGetOneStudentQuery(studentId);
 
  const [user, setUser] = useState({ name: "", fine: 0 });

  const [updateStudent] = useUpdateStudentMutation();
  let  forminfo =[];
  if (isSuccess) {
    const { data: info } = data;
    const{student}=info;
    console.log(student);
     forminfo = student;
  }

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
    setUser({ name: "",fine:0});
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
          defaultValue={forminfo.name}
          name="name"
          label="name"
          type="text"
          id="name"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}

        />
        <TextField
          required
          fullWidth
          defaultValue={forminfo.fine}
          name="fine"
          label="fine"
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

export default EditStudentPage;
