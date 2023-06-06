import React, {useEffect, useState} from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined, NotificationsNone,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import {useDispatch, useSelector} from "react-redux";
import {setMode} from "../states/slice";
import {
    AppBar,
    IconButton,
    InputBase,
    Toolbar,
    useTheme,
    Select,
    InputLabel,
    FormControl,
    MenuItem, Icon, Badge,
} from "@mui/material";
import {setAcademicYear} from "../states/slice";
import {useGetAcademicYearsQuery, useNotificationQuery} from "../states/apiSlice";
import {useNavigate} from "react-router-dom";

const Navbar = ({isSidebarOpen, setIsSidebarOpen}) => {
    const token =  localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])
    // useSelector(state => state.auth.token) ||
    // FETCH ACADEMIC YEARS
    const {data: years, isSuccess: isDone} = useGetAcademicYearsQuery();
    let notificationNumber = 0;
    const {data, isSuccess} = useNotificationQuery();
    if (isSuccess) {
        const {result} = data;
        notificationNumber = result
    }

    const [selectedAcademicYear, setSelectedAcademicYear] = useState('');

    useEffect(() => {
        if (isDone) {
            const {data:academicYears} = years;
            const {schoolYears} = academicYears;
            setSelectedAcademicYear(schoolYears[0].academicYear)
        }
    }, [isDone, years])
    //  DISPATCH TO DISPATCH FOR SETTING YEAR

    useEffect(() => {
        dispatch(setAcademicYear(selectedAcademicYear));
    }, [dispatch, selectedAcademicYear]);
    const schoolYear = useSelector((state) => state.global.academicYear);

    return (
        token ? <AppBar
                sx={{
                    position: "static",
                    background: "none",
                    boxShadow: "none",
                    p:"0px 0px"
                }}
            >
                <Toolbar sx={{justifyContent: "space-between",p:"0px"}}>
                    {/* LEFT SIDE */}
                    <FlexBetween sx={{P:"0px"}}>
                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <MenuIcon/>
                        </IconButton>
                        <FlexBetween
                            backgroundColor={theme.palette.background.alt}
                            borderRadius="9px"
                            gap="3rem"
                            p="0.1rem "
                        >
                            {/* <InputBase placeholder="Search.." />
            <IconButton>
              <Search />
            </IconButton> */}
                            <FormControl sx={{border: "0px", minWidth: 160}} fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">academic Year</InputLabel>
                                <Select

                                    labelId="academicYear"
                                    id="academicYear"
                                    value={selectedAcademicYear}
                                    label="academicYear"
                                    onChange={(event) => {
                                        setSelectedAcademicYear(event.target.value);
                                        // dispatch(setAcademicYear(selectedAcademicYear))
                                        // console.log(selectedAcademicYear)
                                    }}
                                >
                                    {/* <MenuItem value=""><em>academic Year</em></MenuItem> */}
                                    <MenuItem selected value="2023-2024">
                                        2023-2024
                                    </MenuItem>
                                    <MenuItem value="2024-2025">2024-2025</MenuItem>
                                    <MenuItem value="2025-2026">2025-2026</MenuItem>
                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </FlexBetween>
                    {/* RIGHT SIDE */}
                    <FlexBetween gap="1.5rem">
                        <IconButton
                            onClick={() => navigate('/notification')}
                        >
                            <Badge badgeContent={notificationNumber ? notificationNumber : "0"} color="secondary">
                                <NotificationsNone sx={{fontSize: '24px'}}/>
                            </Badge>
                        </IconButton>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkModeOutlined sx={{fontSize: "25px"}}/>
                            ) : (
                                <LightModeOutlined sx={{fontSize: "25px"}}/>
                            )}
                        </IconButton>
                        <IconButton
                            onClick={() => navigate('/settings')}
                        >
                            <SettingsOutlined sx={{fontSize: "25px"}}/>
                        </IconButton>
                    </FlexBetween>
                </Toolbar>
            </AppBar>
            :
            <div/>
    );
};

export default Navbar;
