import React, { useState } from "react";
import {useTheme,Typography, Button, Card, CardContent,CardActions,Collapse, Box, Tooltip,useMediaQuery } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import { AssignmentIndOutlined, AssignmentTurnedIn, CheckBox, EventAvailableTwoTone } from "@mui/icons-material";
const RentalCard= ({title,category,daysLeft,issueDate,dueDate,author,rentalId,returned})=>{

    const theme=useTheme();
    const isNonLargeScreens = useMediaQuery("(max-width:520px)");
    const [isExpanded,setIsExpanded]=useState(false);

    return(
        <>
                <Box
            sx={{   display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            p:"0.5rem 0.5rem",
            flex:"1 1 100%",
            backgroundColor:theme.palette.background.alt,
            borderRadius:"0.25rem",
            width:"100%"}}
    >
        <Box sx={{p:"0px", pb:"4px"}}>
        <FlexBetween>
        <Typography variant="h4" color={theme.palette.accordion.light} >{title}</Typography>
        <Typography variant="h6" sx={{pb:"0px",color: theme.palette.dashboard.main,fontWeight:"bold"}}>{category}</Typography>
        </FlexBetween>
        <FlexBetween>
        <Typography variant="h6" color={theme.palette.bookText.light}>{author}</Typography>
        {returned?  <Tooltip title="returned"><CheckBox sx={{color:"#a6d39f"}}/></Tooltip> :""}
        </FlexBetween>
        
        <Typography variant="h6" sx={{display:"flex"}}>ID:<Typography variant="p" sx={{fontWeight:"bolder"}} > {rentalId}</Typography></Typography>
        {/* <FlexBetween> */}
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
           {returned?"":<Typography variant="h6" sx={{display:"flex"}}>Days left: <Typography variant="p" sx={{fontWeight:"bolder"}}>{daysLeft}</Typography></Typography>}
           
  <Box sx={{ flex: "1 0 auto" }} />
            <CardActions sx={{p:"0px",  }}>
            <Button variant="contained" size="small" 
         onClick={()=>setIsExpanded(!isExpanded)}>see More</Button>
      </CardActions  >
      <Box/>
      </Box>
            {/* </FlexBetween> */}
            </Box>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <Box  display={isNonLargeScreens?"block":"flex"}  p="0px" justifyContent="start" gap="10px">       
        <Typography variant="h6" color={theme.palette.accordion.light} >Issue date: { issueDate}</Typography>
        <Typography variant="h6" color={theme.palette.accordion.light} >Due date: { dueDate}</Typography>
        <Typography variant="h6" color={theme.palette.accordion.light} >Status: {returned? "Book is retuned":"Return the Book" }</Typography>
          {/* <Typography>Academic Level: {academicLevel}</Typography> */}
          {/* <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography> */}
        </Box>
      </Collapse>
        
        </Box>  
        
        </>
    )
};

export default RentalCard;