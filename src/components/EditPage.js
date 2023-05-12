import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
// TO ADD A BOOLEAN TO MAKE FIELDS RED WHEN THERE IS AN ERROR

const EditPage = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const [user, setUser] = useState({ name: "", registrationNumber: "" });

//   const [loginErrors, setLoginErrors] = useState({ name: "", registrationNumber: "" });
  

// TAKES INPUT FROM INPUT FIELDS
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // SUBMITS DATA IN THE INPUTS FIELDS 
  const handleSubmit = (event) => {
    event.preventDefault();
    // form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^[a-zA-Z0-9]+$/;

    // const { name, registrationNumber } = user;

    // const newErrors = {
    //   name: "",
    //   registrationNumber: "",
    // };

    // if (!emailRegex.test(email)) {
    //   newErrors.email = "Invalid email address";
    //   // setUser({email:"",password:""})
    // }

    // if (!passwordRegex.test(password)) {
    //   newErrors.password = "Password can only contain letters and numbers";
    //   // setUser({email:"",password:""})
    // }
    // else if(password.length<4){
    //   newErrors.password="Password is too short";
    //   // setUser({email:"",password:""})
    // }
  

    // // Check if email and username are taken together
    // if (email === "example@example.com" && password === "example") {
    //   newErrors.email = "This email and pasword combination is already taken";
    //   newErrors.password =
    //     "This email and pasword combination is already taken";
    //     // setUser({email:"",password:""})
    // }

    // setLoginErrors(newErrors);

    console.log(user);
    setUser({ name: "", registrationNumber: "" });
  };
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
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
          type="name"
          id="name"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}
        //   error={Boolean(loginErrors.email)}
        //   helperText={loginErrors.email}
        />
        <TextField
          required
          fullWidth
          name="registrationNumber"
          placeholder=" Registration Number"
          label="Registration Number"
          type="number"
          id="registrationNumber"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}
        //   error={Boolean(loginErrors.email)}
        //   helperText={loginErrors.email}
        />

        {/* <FormControl
          variant="outlined"
          required
          fullWidth
          error={Boolean(loginErrors.password)}
          onChange={handleChange}
          sx={{ mb: 2 }}
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
          <FormHelperText id="password">{loginErrors.password}</FormHelperText>
        </FormControl> */}
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
