import { Box, Button, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const WelcomePage = () => {
    const theme = useTheme();

    return (

<>
        <div className="m-0 welcome">
            <div className="d-block d-md-flex  flex-element">
                <div className=" d-flex flex-column flex-1 justify-content-center align-items-center gap-2 p-3 element1">
                    <div className="word-container ">
                    <h2 className="m-0 text-center">Welcome to the library management system</h2>
                    <p className="m-0 text-center explaination">A system helping in easy data storage and book tracking</p>
                    </div>
                </div>
                <div className="d-flex flex-column flex-1 justify-content-start align-items-center gap-2 p-3 pt-1  element2">
                    <h3 className=" m-0 text-center">Sign in as:</h3>
                    <p className=" m-0 pb-5 text-center">Sign based on your status</p>
                    <div className=" d-flex flex-column justify-content-center align-items-center gap-5 align-self-bottom link-container">
                    <Link className="p-2 link-words " to="/login" >Admin/Librarian </Link>
                    <Link className="p-2 link-words " to="/teacherslogin" >Teacher</Link>
                    <Link className="p-2 link-words " to="/studentslogin" >Student</Link>

                    </div>
                </div>
            </div>
        </div>
</>

        // <>
        //     <Box
        //         width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" gap="12px" padding="48px" >


        //         <Box
        //             display="flex"
        //             flexDirection="column"
        //             justifyContent="center"
        //             alignItems="center"
        //             disableEqualOverflow
        //             spacing={3}
        //             margin="0px"
        //             width="100%"
        //              height="100%"
        //             border="1px solid red" 
        //             position="relative"
        //             sx={{filter: 'blur(8px)',
        //             zIndex: 0,}}
        //             // sx={{ backgroundImage: 'url("https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop")', backgroundSize: "cover" }}

        //         >
        //             {/* <Grid2 xs={12} md={6}
        //      sx={{backgroundColor:theme.palette.primary[400],display:"flex", flexDirection:"column" ,alignItems:"center", gap:"10px", padding:"10px" ,justifyContent:"center"}}
        //      >
        //     <Typography variant="p">Welcome to the library management system</Typography>
            
            
        //     <Typography variant="p">A good system for handling library data and faster querrying and efficient dat storage</Typography>

        //     <Box sx={{width:"80%",height:"100%",backgroundImage:'url("https://cdni.iconscout.com/illustration/premium/thumb/online-library-2769744-2302762.png")',backgroundSize:"cover",backgroundPosition:"center"}}>
        //     </Box>
        //     </Grid2> */}
        //             {/* <Grid2 width="100%" display="flex" flexDirection="column" alignItems="center" gap="10px" padding="10px" justifyContent="center"> */}
        //             {/* <img src="https://i.pinimg.com/originals/27/b5/39/27b539d3a765fd72c2fd97dcb8c8708b.png"
        //             alt="books"
        //             style={{position:"absolute", width:"40%",height:"20%"}}/> */}
        //             <Box sx={{position:"absolute", width:"100%",height:"100%",backgroundImage:'url("https://cdni.iconscout.com/illustration/premium/thumb/online-library-2769744-2302762.png")',backgroundSize:"50% 50%",backgroundRepeat:"no-repeat",top:"0px",right:"0px",zIndex:22}}></Box>
        //             <Typography variant="h5"> Sign in as:</Typography>
        //             <Button variant="contained">Admin/Librarian</Button>
        //             <Button variant="contained">Teacher</Button>
        //             <Button variant="contained">Student</Button>

        //             {/* </Grid2> */}
        //         </Box>



        //     </Box>
        // </>
    )

}
export default WelcomePage;