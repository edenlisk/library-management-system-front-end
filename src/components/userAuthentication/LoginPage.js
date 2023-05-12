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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const [user, setUser] = useState({ email: "", password: "" });

  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });
  

// TAKES INPUT FROM INPUT FIELDS
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // SUBMITS DATA IN THE INPUTS FIELDS 
  const handleSubmit = (event) => {
    event.preventDefault();
    // form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    const { email, password } = user;

    const newErrors = {
      email: "",
      password: "",
    };

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
      // setUser({email:"",password:""})
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = "Password can only contain letters and numbers";
      // setUser({email:"",password:""})
    }
    else if(password.length<4){
      newErrors.password="Password is too short";
      // setUser({email:"",password:""})
    }
  

    // Check if email and username are taken together
    if (email === "example@example.com" && password === "example") {
      newErrors.email = "This email and pasword combination is already taken";
      newErrors.password =
        "This email and pasword combination is already taken";
        // setUser({email:"",password:""})
    }

    setLoginErrors(newErrors);

    console.log(user);
    setUser({ email: "", password: "" });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          Account Login
        </Typography>
        <TextField
          required
          fullWidth
          name="email"
          placeholder=" Email"
          label="Email"
          type="Email"
          id="standard-basic"
          variant="outlined"
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={Boolean(loginErrors.email)}
          helperText={loginErrors.email}
        />

        <FormControl
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
          {/* Form helper in helper text */}
          <FormHelperText id="password">{loginErrors.password}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          size="medium"
          type="submit"
          sx={{ mb: 2, width: "100px", alignSelf: "start" }}
          endIcon={<LoginOutlined />}
        >
          Login
        </Button>
        <Typography
          variant="p"
          sx={{ alignSelf: "start", paddingRight: "4px" }}
        >
          Forgot Password ? <NavLink to="/passwordrecover">Recover</NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
