import React, {useState} from 'react'
import { TextField, Typography } from '@mui/material'
import {FormControl, InputLabel,FilledInput,InputAdornment,IconButton,Button,Box} from '@mui/material'
import { Visibility,VisibilityOff } from '@mui/icons-material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { ChevronLeft } from '@mui/icons-material'
// import { Link } from 'react-router-dom'

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  return (
    <Box sx={{p:"0px", 
    width:"100%",height:"100vh",
    justifyContent:"center",display:"flex",alignItems:"center",flexDirection:"column"}}>
      <ChevronLeft sx={{position: "absolute",top:"0px",left:"0px"}}/>
    <Box sx={{width:"43%",height:"70%",display:"flex",justifyContent:"center",alignContent:"center",p:"0px 10px 0px 10px",flexDirection:"column"}}>
      <Typography variant='h4'sx={{textAlign:"center",mb:3}}>Account Sign Up</Typography>
     
         <TextField
         required 
          fullWidth
        placeholder="User name"
        label="User name"
        id="standard-basic"
        variant="outlined"
        type="text"
        sx={{mb:2}}/>
         <TextField
         required 
          fullWidth
        placeholder="Email"
        label="Email"
        id="standard-basic"
        variant="outlined"
        type="email"
        sx={{mb:2}}/>
         <FormControl variant="filled"
         required
        fullWidth
        sx={{mb:2}}>
<InputLabel htmlFor="password">Password</InputLabel>
<FilledInput
  id="password"
  type={showPassword ? 'text' : 'password'}
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
<Button variant="contained" size="medium" type="submit" sx={{mb:2,width:"100px"}} >Sign Up</Button>
      
 

      <Grid xs={12} display="flex" justifyContent="start" alignItems="center" >
  
        <small>Already have account ?</small>
      </Grid>
      
    </Box>
    </Box>

  )
}

export default SignUpPage