import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTeacherQuery } from "../../states/apiSlice";
import { ChevronLeftOutlined, Key } from "@mui/icons-material";

const TeachersNotification=()=>{
    const theme=useTheme();
    const navigate=useNavigate();
    const{teacherId}=useParams();
    const{data:info,isLoading:isGeting,isSuccess}=useGetTeacherQuery(teacherId);
    let notification=[];
    if (isSuccess) {
        const {data:rtData}=info;
        const {teacher:teachers}=rtData;
        const {messages:messagez}=teachers;
    //  //    const {rentals:rentalData}=rtData;
    //      // StName=Name;
         notification=messagez;
         console.log(rtData);
     
       }

return (

    <>
    <Box padding="17px 17px 5px 17px" display="flex" flexDirection="column" gap="8px">
        <ChevronLeftOutlined onClick={()=>navigate(-1)}/>
        <Typography variant="h2">Notifications</Typography></Box>
    <Box display="flex"
    gap="10px"
    flexDirection="column"
    justifyContent="center"
    alignItems="start"
    padding="10px 17px">
        { notification.map(({message,subject,_id})=>(
            <Box backgroundColor={theme.palette.background.alt} width="100%" padding="10px" borderRadius="0.25rem" key={_id}>
            <Typography variant="h4">{subject}</Typography>
            <Typography variant="h6"> {message}</Typography>
            </Box>
        )) }
    </Box>
    </>
)
}

export default TeachersNotification;