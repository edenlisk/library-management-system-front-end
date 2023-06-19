import React from "react";
import { Box,useTheme,useMediaQuery,Typography} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import RentalCard from "./RentalCard";
import StudentsStatsCards from "./StudentsStatsCards";


const statsAreaLargescrn=`
"box1 box2 box3 box4"`;
const statsAreaSmallscrn=`
"box1"
"box2"
"box3"
"box4"`
const StudentsInteraction=()=>{
    const theme =useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width:800px)");



return(
    <>
    <Box  display="grid"
    sx={{
        gridTemplateColumns:isNonMediumScreens?"repeat(4,minmax(60px,1fr))":"1fr",
        gridAutoRows:"minmax(120px,auto)",
        gridTemplateAreas: isNonMediumScreens? statsAreaLargescrn:statsAreaSmallscrn,
    }}
    gap="16px"
    padding="17px"
    >
      <StudentsStatsCards gridArea="box1"></StudentsStatsCards>
      <StudentsStatsCards gridArea="box2"></StudentsStatsCards>
      <StudentsStatsCards gridArea="box3"></StudentsStatsCards>
      <StudentsStatsCards gridArea="box4"></StudentsStatsCards>


    </Box>
    <Box width="100%" display="flex"
    flexDirection="column" gap="4px"
    padding="17px"
    >
        <Box padding="10px">
            <Typography variant="h2">Rentals</Typography>
        </Box>
      <RentalCard/>
    </Box>
    
    </>
)

};

export default StudentsInteraction;