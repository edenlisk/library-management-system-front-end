import React, { useState } from "react";
import {useTheme,Typography, Button, Card, CardContent,CardActions,Collapse, Box } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
const RentalCard= ({title,category,daysLeft,issueDate,dueDate})=>{

    const theme=useTheme();
    const [isExpanded,setIsExpanded]=useState(false);

    return(
        <>
                <Card
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
        <Typography variant="h6" sx={{pb:"10px"}}>{category}</Typography>
        </FlexBetween>

        <FlexBetween>
            <Typography variant="h6">remaining days:{daysLeft}</Typography>
            <CardActions sx={{p:"0px"}}>
            <Button variant="contained" size="small"
         onClick={()=>setIsExpanded(!isExpanded)}>see More</Button>
      </CardActions  >
            </FlexBetween>
            </Box>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <Box sx={{p:"0px"}}>       
        <Typography variant="h6" color={theme.palette.accordion.light} >issue date:{issueDate}</Typography>
        <Typography variant="h6" color={theme.palette.accordion.light} >due date:{dueDate}</Typography>
          {/* <Typography>Academic Level: {academicLevel}</Typography> */}
          {/* <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography> */}
        </Box>
      </Collapse>
        
        </Card>  
        
        </>
    )
};

export default RentalCard;