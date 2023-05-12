import React, { useState } from "react";

import { TextField, Typography,useTheme} from "@mui/material";
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

const PasswordRecoverPage = () => {
  const theme=useTheme();
  // dummy mail for confirmation
  const dummyMail = "webituri@1";
  const [showPassword, setShowPassword] = useState(false);

  const [isEmail, setIsEmail] = useState(false);
  // for getting email
  const [email, setEmail] = useState("");

  // handle if the email exists
  const handleMailState = (e) => {
    e.preventDefault();
    if (email === dummyMail) {
      setIsEmail(!isEmail);
    }
    console.log(email);
  };
  // handle email input in the form

  const handleEmailInput = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // handle password change state for the two inputs fields match
  const [user, setUser] = useState({ newPassword: "", confirmPassword: "" });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // handle password form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    setUser({ newPassword: "", confirmPassword: "" });
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
          {isEmail ? "Reset Password" : "Forgot Password"}
        </Typography>
        {!isEmail && (
          <>
            <TextField
              required
              fullWidth
              placeholder=" Email"
              label="Email"
              type="Email"
              id="standard-basic"
              variant="outlined"
              onChange={handleEmailInput}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              size="medium"
              type="button"
              // backgroundColor={theme.palette.secondary.main}
              // styling of button bg color missing to-do
              sx={{ mb: 2, width: "100%", p: "10px 10px", alignSelf: "start" }}
              endIcon={<LoginOutlined />}
              onClick={handleMailState}
            >
              Reset Password
            </Button>
          </>
        )}
        {/* conditional rendering  must be removed and make separate component after */}
        {isEmail && (
          <>
            <FormControl
              variant="filled"
              required
              fullWidth
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <InputLabel htmlFor="password">New Password</InputLabel>
              <FilledInput
                id="new-password"
                name="newPassword"
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
            <FormControl
              variant="filled"
              required
              fullWidth
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <FilledInput
                id="confirmPassword"
                name="confirm-password"
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
              display="flex"
              alignItems="center"
              sx={{ mb: 2, width: "100%", p: "10px 10px", alignSelf: "start" }}
              endIcon={<LoginOutlined />}
            >
              Confirm Password
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PasswordRecoverPage;
