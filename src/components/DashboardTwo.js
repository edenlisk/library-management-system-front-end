import React, { useState, useEffect } from "react";
import {
    useGetClassesQuery,
    useGetAcademicYearsQuery,
} from "../states/apiSlice";
import {
    Box,
    Skeleton,
    useMediaQuery,
    useTheme,

} from "@mui/material";
import {
    PersonAdd,
    LibraryBooks,
    MonetizationOnRounded,
    LibraryAddTwoTone,
    LibraryBooksTwoTone,
    LibraryAddRounded,
    MonetizationOnTwoTone,
    CancelTwoTone,
    LibraryAddCheckTwoTone
} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch, useSelector } from "react-redux";
import StatBox from "./StatBox";
import Header from "./Header";

import { setAcademicYear } from "../states/slice";
import TopStudents from "./dashboard/TopStudents";
import LastCreated from "./dashboard/LastCreated";
import TopBooks from "./dashboard/TopBooks";
import { useTotalStatsQuery } from "../states/apiSlice";

const DashboardTwo = () => {
    const theme = useTheme();

    const isNonMediumScreens = useMediaQuery("(min-width:1200px)");
    const { data: years, isSuccess: isDone } = useGetAcademicYearsQuery();
    const { data, isSuccess, isLoading } = useTotalStatsQuery();
    let statistics;
    if (isSuccess) {
        const { data: totals } = data;
        statistics = totals;
    }





    return (

        <>

            <Header  title="DASHBOARD" subtitle="Welcome to Lycee De Kigali Library Management System" />

            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="minmax(160px, auto)"
                gap="20px"
                p="0px 17px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
            >
                <Box gridColumn="span 8"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between" flex="1 1 100%"
                    gap="1rem">

                    <StatBox
                        title="Total Revenue"
                        value={isLoading? <Skeleton animation="wave"  sx={{ width:"70%",height:30 }} />:(data && `${statistics.revenue} Rwf`)}

                        icon={
                            <MonetizationOnTwoTone
                                sx={{ color: theme.palette.dashboard.main, fontSize: "26px" }}
                            />
                        }
                    />
                    <StatBox
                        title="Total Books"
                        value={isLoading? <Skeleton animation="wave"  sx={{ width:"70%",height:30 }} />:(data && statistics.books)}


                        icon={
                            <LibraryBooksTwoTone
                                sx={{ color: theme.palette.dashboard.main, fontSize: "26px" }}
                            />
                        }
                    />

                    <StatBox
                        title="Lost Books"
                        value={isLoading? <Skeleton animation="wave"  sx={{ width:"70%",height:30 }} />:(data && statistics.lostBooks)}

                        icon={
                            <CancelTwoTone
                                sx={{ color: theme.palette.dashboard.main, fontSize: "26px" }}
                            />
                        }
                    />
                    <StatBox
                        title="Issued Books"
                        value={isLoading? <Skeleton animation="wave"  sx={{ width:"70%",height:30 }} />:(data && statistics.issuedBooks)}
                        //   increase="+43%"
                        icon={
                            <LibraryAddCheckTwoTone
                                sx={{ color: theme.palette.dashboard.main, fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 4"
                    // gridRow="span 3"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    p="1rem 0.5rem"
                    flex="1 1 100%"
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="0.55rem"
                    width="100%"
                >
                    <TopStudents />
                </Box>
                <Box
                    gridColumn="span 8"
                    // gridRow="span 4"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    p="1rem 0.5rem"
                    flex="1 1 100%"
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="0.55rem"
                    width="100%"
                >
                    <LastCreated />
                </Box>
                <Box
                    gridColumn="span 4"
                    // gridRow="span 3"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    p="1rem 0.5rem"
                    flex="1 1 100%"
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="0.55rem"
                    width="100%"
                >
                    <TopBooks />
                </Box>
            </Box>

        </>
    );
};

export default DashboardTwo;
