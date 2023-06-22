import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton, Button, FormHelperText, FormControl, OutlinedInput, InputLabel, InputAdornment, CircularProgress } from "@mui/material";
import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useTeacherLoginMutation } from "../../states/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TcLoginPage = () => {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [student, setStudent] = useState({ registrationNumber: "", password: "" });
  let teacherId=""
  const [TeacherLogin,{isLoading,isSuccess,isError,error}]=useTeacherLoginMutation();

  useEffect(()=>{
    if(isSuccess){
      toast.success("Logged in successfully");
    }
    else if(isError){
      const { data: fullError } = error;
      const { message } = fullError;
      toast.error(message);
    }
  },[isSuccess,isError,error])




  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleStudentChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  };

  const handleStudentSubmit = async(event) => {
    event.preventDefault();
    const body={...student};
    const {registrationNumber,password}=student
     const response=await TeacherLogin({registrationNumber,password})
     console.log(body)

     if (response){
      const{data:teacherData}=response
      const{data:userDatata}=teacherData
      const{user:userInfo}=userDatata
      const{_id:tcId}=userInfo
      teacherId=tcId
      console.log(teacherData);
      navigate(`/teachers/notifications/${teacherId}`);
     }
    // console.log(student);
    // setStudent({ registrationNumber: "", password: "" })

  };





  return (
    <>
      <Box   
        height="100%"  p="10px 10px">
        <Box
          component="form"
          maxWidth={440}
          minHeight={400}
          margin="auto"
          display="flex"
          height="420px"
          flexDirection="column"
          alignItems="center"
          justifyContent="top"
          gap="12px"
          p="10px 10px"
          boxShadow={"1.5px 1.5px 10px #ccc"}
          borderRadius="7px"
        >
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Teacher Login
          </Typography>
          <TextField
            required
            fullWidth
            name="registrationNumber"
            label="Registration Number"
            type="text"
            id="registrationNumber"
            variant="outlined"
            onChange={handleStudentChange}
            sx={{}}
          // error={Boolean(loginErrors.email)}
          // helperText={loginErrors.email}
          />

          <FormControl
            variant="outlined"
            required
            fullWidth
            // error={Boolean(loginErrors.password)}
            onChange={handleStudentChange}
            sx={{}}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />

            {/* <FormHelperText id="password">{loginErrors.password}</FormHelperText> */}
          </FormControl>
        {isLoading?  <Button
            variant="contained"
            size="medium"
            type="submit"
            sx={{ width: "100px", alignSelf: "start" }}
            disabled
          >
            <CircularProgress size={20}/>
          </Button>:<Button
            variant="contained"
            size="medium"
            type="submit"
            sx={{ width: "100px", alignSelf: "start" }}
            endIcon={<LoginOutlined />}
            onClick={handleStudentSubmit}
          >
            Login
          </Button>}

        </Box>
      </Box>


    </>
  )
};

export default TcLoginPage;