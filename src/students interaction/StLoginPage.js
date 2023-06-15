import React,{useState} from "react";
import { Box,Typography,TextField,IconButton,Button,FormHelperText,FormControl,OutlinedInput,InputLabel,InputAdornment } from "@mui/material";
import { LoginOutlined,Visibility,VisibilityOff } from "@mui/icons-material";


const StLoginPage=()=>{
  const [showPassword, setShowPassword] = useState(false);
  const [student,setStudent]=useState({email:"",pasword:""});

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit=()=>{
  console.log(student);
  };

  const handleChange=(e)=>{
    setStudent({...student,[e.target.name]:e.target.value})
  };
    return(
        <>
        <Box width="100%" display="flex"
        justifyContent="center"
        alignContent="center"
        height="100%"
        p="10px 70px">
                 <Box
        component="form"
        // onSubmit={handleSubmit}
        // maxWidth="800px"
        sx={{maxWidth:"800px"}}
        
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
        <Typography variant="h3" sx={{ textAlign: "center"}}>
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
          // error={Boolean(loginErrors.email)}
          // helperText={loginErrors.email}
        />

        <FormControl
          variant="outlined"
          required
          fullWidth
          // error={Boolean(loginErrors.password)}
          onChange={handleChange}
          sx={{ }}
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
        <Button
          // disabled={!!isLoading}
          variant="contained"
          size="medium"
          type="submit"
          sx={{ width: "100px", alignSelf: "start" }}
          endIcon={<LoginOutlined />}
          onClick={handleSubmit}
        >
          Login
        </Button>

      </Box>
        </Box>
        
        
        </>
    )
};

export default StLoginPage;