import { AppBar, Avatar, Toolbar,Box, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../components/FlexBetween";
import { AutoStoriesOutlined, NotificationsOutlined, SettingsOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const UserNavbar = ({studentId,userName}) => {
    const navigate=useNavigate();
    return (

        <>
            <AppBar sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
                p: "0px 0px",
            }}>

                <Toolbar sx={{justifyContent: "space-between",p:"0px"}}>
                    <FlexBetween p="0px 10px" alignItems="center">
                        <Typography sx={{fontSize:"20px",fontWeight:"bold",display:"flex",alignItems:"center",gap:"7px"}}>LDK <AutoStoriesOutlined sx={{fontSize:"26px"}}/> </Typography>
                        
                    </FlexBetween>
                    {/* <FlexBetween justifyContent="space-between" alignItems="center"
                    gap="7px">
                        <Typography sx={{fontSize:"20px",fontWeight:"bold"}}>notifications</Typography>
                        
                    </FlexBetween> */}
                    <FlexBetween p={"0px 10px"} gap="20px" alignItems="center">
                    {/* <Typography sx={{fontSize:"20px",fontWeight:"bold"}} onClick={()=>navigate(`/students/newnotifications/${studentId} `)} >notifications</Typography> */}
                    <NotificationsOutlined  sx={{fontSize:"28px"}} onClick={()=>navigate(`/students/newnotifications/${studentId} `)}/>
                       
                        <Avatar
                                        alt="profile"
                                        // src="https://media.istockphoto.com/id/502581380/photo/portrait-of-an-african-american-man-with-glasses.jpg?s=612x612&w=0&k=20&c=cjS24yXM56lie7N-KsFtDH2CKCaS03OQFxwJgIag0ac="

                                        sx={{objectFit: "cover", width: 32, height: 32 }}
                                    >
                                        {userName.charAt(0).toUpperCase() }
                                    </Avatar>
                                    {/* <SettingsOutlined sx={{fontSize:"25px"}}/> */}
                    </FlexBetween>

                </Toolbar>
            </AppBar>
        </>
    )


}
export default UserNavbar;