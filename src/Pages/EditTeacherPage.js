import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Typography, Button,Box,useTheme } from "@mui/material";
import { LoginOutlined,ChevronLeftOutlined} from "@mui/icons-material";
import { useUpdateTeacherMutation,useGetTeacherQuery} from "../states/apiSlice";
import {toast} from "react-toastify";

// TO ADD A BOOLEAN TO MAKE FIELDS RED WHEN THERE IS AN ERROR

const EditTeacherPage = () => {
  const { teacherId } = useParams();
  const navigate=useNavigate();
  const theme=useTheme();
  const{data,isLoading,isSuccess}=useGetTeacherQuery(teacherId);
 
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

  const [updateTeacher, {isSuccess:isUpdateSuccess, isError:isUpdateError, error:updateError}] = useUpdateTeacherMutation();

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Teacher updated successfully")
    } else if (isUpdateError) {
      const { data:fullError } = updateError;
      const {message} = fullError;
      toast.error(message);
    }
  }, [isUpdateError, isUpdateSuccess]);

  let  forminfo =[];

  const capitalizeSentence = (sentence) =>(
    sentence
      .toLowerCase()
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase())
    );

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: capitalizeSentence(e.target.value) });
  };

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
          sx={{ mb: 2, width: "100px", alignSelf: "start",backgroundColor:theme.palette.buttons.main }}
          endIcon={<LoginOutlined />}
        >
          save
        </Button>
      </Box>
    </Box>
  );
};

export default EditTeacherPage;
