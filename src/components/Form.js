import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import {
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [user, setUser]=useState({email:"", password:""});
  const handleChange=(e)=>{
    setUser({...user, [e.target.name]:e.target.value});
  }
const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(user);
    setUser({email:"", password:""})
}
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
          variant="filled"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <FormControl variant="filled"
         required fullWidth 
        onChange={handleChange} sx={{ mb: 2 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <FilledInput
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
          Forgot Password ? <NavLink to="/dashboard">Recover</NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Form;
