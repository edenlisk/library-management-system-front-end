import React, { useState,useEffect } from "react";
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
import { useUpdateTeacherMutation,useGetTeacherQuery} from "../states/apiSlice";

// TO ADD A BOOLEAN TO MAKE FIELDS RED WHEN THERE IS AN ERROR

const EditTeacherPage = () => {
  const { teacherId } = useParams();
  const navigate=useNavigate();
  const{data,isLoading,isSuccess,isError,error}=useGetTeacherQuery(teacherId);
 
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    if (isSuccess) {
      const { data: info } = data;
      const{teacher:tchr}=info;
      console.log(tchr);
      setUser({
        name:tchr.name,
      })
    }
  }, [isSuccess]);

  const [updateTeacher] = useUpdateTeacherMutation();
  let  forminfo =[];
  // if (isSuccess) {
  //   const { data: info } = data;
  //   // const{student}=info;
  //   console.log(info);
  //    forminfo = info;
  // }

  // TAKES INPUT FROM INPUT FIELDS
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // SUBMITS DATA IN THE INPUTS FIELDS
  const handleSubmit =  async (event) => {
    event.preventDefault();
    const body={...user}
    await updateTeacher({ body, teacherId });
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
          Edit Teacher Info
        </Typography>
        <TextField
          required
          fullWidth
          value={user.name || ""}
          name="name"
          label="name"
          type="text"
          id="name"
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

export default EditTeacherPage;
