import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../states/apiSlice";
import { setAccessibility, setAuthToken, setUserData } from "../../states/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [login, { data, isSuccess, isLoading, isError, error }] =
    useLoginMutation();
  const navigate = useNavigate();
  // const [token, setToken] = useState(() => {
  //   return localStorage.getItem('token')
  // })
  // const [userData, setProfile] = useState(() => {
  //   return localStorage.getItem('profile');
  // })
  // const [accessability, setAccess] = useState(() => {
  //   return localStorage.getItem('accessability');
  // })
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('profile');
  const accessability = localStorage.getItem('accessability');
  useEffect(() => {


    if (token && userData && accessability) {
      dispatch(setAuthToken(token));
      dispatch(setUserData(userData));
      dispatch(setAccessibility(accessability));
      navigate("/dashboard");
    }
  }, [navigate,useDispatch]);


  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
    } else if (isError) {
      const { data: fullError } = error;
      const { message } = fullError;
      toast.error(message);
    }
  }, [isError, isSuccess, error]);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [user, setUser] = useState({ email: "", password: "" });

  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    const { email, password } = user;

    const newErrors = {
      email: "",
      password: "",
    };

    const body = { email, password };
    const response = await login({ body });
    if (response) {
      const { data: userData } = response;
      const { token, data } = userData;
      dispatch(setAuthToken(token));
      dispatch(setUserData(data.user));
      dispatch(setAccessibility(data.user.accessibility))
      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify(data.user));
      localStorage.setItem("accessability", data.user.accessibility);
      navigate("/dashboard");
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box height="100%" p="10px 10px">
      <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth={440}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        // height="70%"
        minHeight={700}
        margin="auto"
        gap="13px"
        p="10px 10px"
        boxShadow={"1.5px 1.5px 10px #ccc"}
        padding={2}
        borderRadius="7px"
        marginTop="20px"
      >
        <Typography variant="h3" sx={{ textAlign: "center",}}>
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
          sx={{}}
          error={Boolean(loginErrors.email)}
          helperText={loginErrors.email}
        />

        <FormControl
          variant="outlined"
          required
          fullWidth
          error={Boolean(loginErrors.password)}
          onChange={handleChange}
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

          <FormHelperText id="password">{loginErrors.password}</FormHelperText>
        </FormControl>
        <Box display="flex" alignItems="center" gap="8px" justifyContent="start" width="100%">
        <Button
          disabled={!!isLoading}
          variant="contained"
          size="medium"
          type="submit"
          sx={{ width: "100px", alignSelf: "start" }}
          endIcon={<LoginOutlined />}
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="#FFE3A3"
              strokeWidth="3"
              animationDuration="0.75"
              width="25"
              visible={true}
            />
          ) : (
            `Login`
          )}
        </Button>
        {/* <Link to={`/studentsLogin`}>
            <Typography >Student?</Typography>
            </Link> */}
        </Box>
        
      </Box>
    </Box>
  );
};

export default LoginPage;
