import React, { useState, useEffect } from "react";
import {
  useLessBooksQuery
} from "../states/apiSlice";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Accordion,AccordionSummary,AccordionDetails, CircularProgress
} from "@mui/material";
import {
  WarningRounded,
 ExpandMore
} from "@mui/icons-material";

const BookNotify  = () => {
  // FETCH ACADEMIC YEARS
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");
  const { data:dataz, isSuccess,isLoading}=useLessBooksQuery();
  let bookes=[]
  if (isSuccess){
    const {data:bkdata}=dataz;
    const{books:bookz}=bkdata;
    bookes=bookz;
      console.log(dataz)
  }

  const criticalBooks=[ {
    BKname: "The Hidden Path",
    total: 50,
    remaining: 20,
    id:1
  },
  {
    BKname: "Beyond the Horizon",
    total: 30,
    remaining: 5,
    id:2
  },
  {
    BKname: "Whispering Shadows",
    total: 25,
    remaining: 10,
    id:3
  },
  {
    BKname: "The Enigma Code",
    total: 15,
    remaining: 2,
    id:4
  },
  {
    BKname: "Secrets of the Lost Temple",
    total: 40,
    remaining: 15,
    id:5
  },
  {
    BKname: "The Forgotten Key",
    total: 20,
    remaining: 8,
    id:6
  },
  {
    BKname: "Echoes of Eternity",
    total: 35,
    remaining: 18,
    id:7
  },
  {
    BKname: "The Silent Witness",
    total: 50,
    remaining: 30,
    id:8
  }];

  const LessBooks=({BKname,total,remaining,id,category})=>{

    return(
      <Box padding={4.5} display="flex" gap={0.5} alignItems="center">
      <WarningRounded color="warning" sx={{ fontSize: 22 }}/>
      <Typography variant="h5">Book:<span style={{fontWeight:"bolder"}}> {BKname}</span> of category:<span style={{fontWeight:"bold"}}> {category}</span> is at it's limit <span style={{color:"red"}}>{`(${remaining} of ${total})`}</span> is remaining.</Typography>
    </Box>
    )
  }
  return (

    <>

<Box padding={3.5}>
     {isLoading? <CircularProgress size={25}/>: <Accordion sx={{backgroundColor:theme.palette.background.default,'& .MuiAccordionDetails-root': { padding: 0 },'& .MuiBox-root': { padding:1 }}}>
      <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
             <Box padding={4.5} display="flex" gap={0.5} alignItems="center">
      <WarningRounded color="warning" sx={{ fontSize: 26 }}/>
      <Typography variant="h4">Books</Typography>
    </Box>
        
        </AccordionSummary>
        <AccordionDetails>
        {bookes.map(({bookName,numberOfBooks,availableCopy,_id,categoryName
})=>(<LessBooks key={_id}
        BKname={bookName} total={numberOfBooks} remaining={availableCopy} category={categoryName
        }/>))}

        </AccordionDetails>
      </Accordion>}
      </Box>
      
    </>
  );
};

export default BookNotify;