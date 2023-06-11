import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import {
  Button,
  Box,
  CircularProgress
} from "@mui/material";
import {ChevronLeftOutlined } from "@mui/icons-material";
import { useUpdateStudentMutation,useGetOneStudentQuery } from "../states/apiSlice";
import {toast} from "react-toastify";


const EditStudentPage = () => {
  const { studentId } = useParams();
  const navigate=useNavigate();
  const{data,isLoading,isSuccess}=useGetOneStudentQuery(studentId);
 
  const [user, setUser] = useState({ name: "", fine: 0 });

  const [updateStudent, {isSuccess:isUpdateSuccess, isError:isUpdateError, error:updateError, isLoading:isSending}] = useUpdateStudentMutation();

  useEffect(() => {
    if (isSuccess) {
      const { data: info } = data;
      const{student}=info;
      console.log(student);
      setUser({ name: student.name, fine: student.fine })
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Student updated successfully")
    } else if (isUpdateError) {
      const { data:fullError } = updateError;
      const {message} = fullError;
      toast.error(message);
    }
  }, [isUpdateError, isUpdateSuccess]);

  const capitalizeSentence = (sentence) =>(
    sentence
      .toLowerCase()
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase())
    );

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]:e.target.name === "name" ? capitalizeSentence(e.target.value) : e.target.value});
  };

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
      <ChevronLeftOutlined onClick={()=>navigate(-1)}/>
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
          value={user.name || "" }
          name="name"
          label="name"
          type="text"
          id="name"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}

        />
        <TextField
          fullWidth
          value={user.fine || "" }
          name="fine"
          label="fine"
          type="text"
          id="fine"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}

        />

       {isSending? <Button
          variant="contained"
          size="medium"
          type="submit"
          disabled
          sx={{ mb: 2, width: "100px", alignSelf: "start" }}
          endIcon={ <CircularProgress size={20}/>}
        >
          Updating
        </Button>:<Button
          variant="contained"
          size="medium"
          type="submit"
          sx={{ mb: 2, width: "100px", alignSelf: "start" }}
        >
          Update
        </Button>}
      </Box>
    </Box>
  );
};

export default EditStudentPage;
