import React from "react";
import { Box,useTheme,useMediaQuery,Typography} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import RentalCard from "./RentalCard";
import StudentsStatsCards from "./StudentsStatsCards";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStudentRentalsQuery,useGetOneStudentQuery } from "../states/apiSlice";
import { MonetizationOnTwoTone, NotificationAddOutlined } from "@mui/icons-material";


const statsAreaLargescrn=`
"box1 box2 box3 box4"`;
const statsAreaSmallscrn=`
"box1"
"box2"
"box3"
"box4"`
const StudentsInteraction=()=>{
    const theme =useTheme();
    const navigate =useNavigate();
    let rents=[]
    let StName=""
    let StData=[]
    const isNonMediumScreens = useMediaQuery("(min-width:800px)");
    const {studentId}=useParams();

    
  const{data,isLoading:isFetching,isSuccess:isDone}=useGetStudentRentalsQuery(studentId);
  const{data:info,isLoading:isGeting,isSuccess}=useGetOneStudentQuery(studentId);
  if (isDone) {
   const {data:rtData}=data;
   const {rentals:rentalData}=rtData;

   console.log(rtData);
   rents=rentalData;

  }
  if (isSuccess) {
   const {data:rtData}=info;
   const {student:students}=rtData;
   const {name:Name}=students;
   const {rentals:rentalData}=rtData;
    StName=Name;
    StData=students;
    console.log(rtData);

  }
  const daysLeft=(dt1,dt2)=>{
    const date1 = new Date(dt1);
const date2 = new Date(dt2);

const diffInMilliseconds = date2 - date1;

const millisecondsInADay = 1000 * 60 * 60 * 24;
const diffInDays = Math.floor(diffInMilliseconds / millisecondsInADay);
return diffInDays;
  }



return(
    <>
    <Box padding="17px"><Typography variant="h3">{StName}</Typography></Box>
    <Box  display="grid"
    sx={{
        gridTemplateColumns:isNonMediumScreens?"repeat(4,minmax(58px,1fr))":"1fr",
        gridAutoRows:"minmax(120px,auto)",
        gridTemplateAreas: isNonMediumScreens? statsAreaLargescrn:statsAreaSmallscrn,
    }}
    gap="16px"
    padding="17px"
    >
      <StudentsStatsCards title="Fine" value={StData.fine} icon={<MonetizationOnTwoTone sx={{fontSize:"30px",color: theme.palette.dashboard.main}}/>} gridArea="box1"></StudentsStatsCards>
      <StudentsStatsCards title="Rentals" value={rents.length} gridArea="box2"></StudentsStatsCards>
      <StudentsStatsCards gridArea="box3"></StudentsStatsCards>
      <StudentsStatsCards gridArea="box4"></StudentsStatsCards>


    </Box>
    <Box width="100%" display="flex"
    flexDirection="column" gap="4px"
    padding="17px"
    >
        <Box padding="10px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h2">Rentals</Typography>
            <NotificationAddOutlined onClick={()=>navigate(`/students/newnotifications/${studentId}`)}/>
        </Box>


      {rents.map(({categoryName,issueDate,dueDate,nameOfBook,_id,author,bookId})=>(
      
        <RentalCard title={nameOfBook}
        key={_id}
        category={categoryName}
        daysLeft={daysLeft(issueDate,dueDate)}
        author={author}
        issueDate={issueDate.split('T')[0]}
        dueDate={dueDate.split('T')[0]}
        rentalId={bookId}
        />
      
      ))}
    </Box>
    
    </>
)

};

export default StudentsInteraction;