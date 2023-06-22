import React, { useState } from "react";
import TchNavbar from "./TchNavbar";
import { Box, useTheme, useMediaQuery, Typography, Menu, MenuItem } from "@mui/material";
import RentalCard from "../../students interaction/RentalCard";
import StudentsStatsCards from "../../students interaction/StudentsStatsCards";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTeacherRentalsQuery, useGetTeacherQuery } from "../../states/apiSlice";
import { AssignmentLateTwoTone, CancelTwoTone, FilterAltOutlined, LibraryBooksTwoTone, MonetizationOnTwoTone } from "@mui/icons-material";



const statsAreaLargescrn = `
"box1 box2 box3 "`;
const statsAreaSmallscrn = `
"box1"
"box2"
"box3"`
const TeachersInteraction = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    // let filteredObject=[];
    let rents = []
    let TcName = ""
    let StData = []
    const isNonMediumScreens = useMediaQuery("(min-width:800px)");
    const { teacherId } = useParams();


    const { data, isLoading: isFetching, isSuccess: isDone } = useGetTeacherRentalsQuery(teacherId);
    const { data: info, isLoading: isGeting, isSuccess } = useGetTeacherQuery(teacherId);
    if (isDone) {
        const { data: rtData } = data;
        const { teacherRentals: rentalData } = rtData;

        console.log(rtData);
        rents = rentalData;
        console.log(rents);


    }
    if (isSuccess) {
        const { data: rtData } = info;
        const { teacher: tchr } = rtData;
        const { name: Name } = tchr;
        //    const {rentals:rentalData}=rtData;
        TcName = Name;
        //     StData=students;
        console.log(rtData);

    }
    const daysLeft = (dt2) => {
        const dueDate = new Date(dt2);
        const timeDiff = dueDate.getTime() - new Date().getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        if (daysDiff < 0) {
            return ' No days left!!'
        }
        return daysDiff;
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState("");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilter = (filterVal) => {
        setSearch(filterVal);

        console.log(`filter  ` + filterVal)


        handleClose();
    }

    let filteredObject = []
    if (search !== "" || null) {

        filteredObject = rents.filter((rent) => rent.returned === search);
    }
    else {
        filteredObject = rents
    }

    const OverdueBooks = rents.filter((item) => {
        const dueDate = new Date(item.dueDate);
        const timeDiff = dueDate.getTime() - new Date().getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        if (!item.returned) {
            return daysDiff <= 3;
        }

    });

    const unReturned = rents.filter((rent) => rent.returned === false).length;

    console.log(unReturned)

    const removeFilter = () => {

    }



    return (
        <>
            <TchNavbar
                userName={TcName} teacherId={teacherId} />
            <Box display="flex" flexDirection="column" gap="15px" padding="0px 20px 20px 20px"><Typography variant="h3">{TcName}</Typography>
                <Box display="grid"
                    sx={{
                        gridTemplateColumns: isNonMediumScreens ? "repeat(3,minmax(58px,1fr))" : "1fr",
                        gridAutoRows: "minmax(120px,auto)",
                        gridTemplateAreas: isNonMediumScreens ? statsAreaLargescrn : statsAreaSmallscrn,
                    }}
                    gap="16px"

                >
                    <StudentsStatsCards title="Rentals" value={rents.length} icon={<LibraryBooksTwoTone sx={{ fontSize: "30px", color: theme.palette.dashboard.main }} />} gridArea="box1"></StudentsStatsCards>
                    <StudentsStatsCards title="Un-returned Rentals" value={unReturned} icon={<CancelTwoTone sx={{ fontSize: "30px", color: theme.palette.dashboard.main }} />} gridArea="box2"></StudentsStatsCards>
                    <StudentsStatsCards title="Overdue Rentals" value={OverdueBooks.length} icon={<AssignmentLateTwoTone sx={{ fontSize: "30px", color: theme.palette.dashboard.main }} />} gridArea="box3"></StudentsStatsCards>


                </Box>
                <Box width="100%" display="flex"
                    flexDirection="column" gap="4px"

                >
                    <Box padding="10px" display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h2">Rentals</Typography>
                        <FilterAltOutlined onClick={handleClick} />
                    </Box>


                    {filteredObject.map(({ categoryName, issueDate, dueDate, nameOfBook, _id, author, bookId, returned }) => (

                        <RentalCard title={nameOfBook}
                            key={_id}
                            category={categoryName}
                            daysLeft={daysLeft(dueDate)}
                            author={author}
                            issueDate={issueDate.split('T')[0]}
                            dueDate={dueDate.split('T')[0]}
                            rentalId={bookId}
                            returned={returned}
                        />

                    ))}
                </Box>
            </Box>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'gauge-button',
                }}
                sx={{
                    "& .MuiList-root": {
                        backgroundColor: ""
                    }
                }}
            >
                <MenuItem onClick={() => handleFilter(true)}>Returned</MenuItem>
                <MenuItem onClick={() => handleFilter(false)}>Un returned</MenuItem>
                <MenuItem onClick={() => handleFilter("")}>All</MenuItem>
            </Menu>
        </>
    )

};

export default TeachersInteraction;