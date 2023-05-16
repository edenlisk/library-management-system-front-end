import React, { useEffect, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../states/slice";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { setAcademicYear } from "../states/slice";
import { useGetAcademicYearsQuery } from "../states/apiSlice";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // FETCH ACADEMIC YEARS
  const { data: years, isSuccess: isDone } = useGetAcademicYearsQuery();
  console.log(years);

  const [selectedAcademicYear, setSelectedAcademicYear] = useState(() => {
    if (isDone) {
      const { data: academicYears } = years;
      const { schoolYears } = academicYears;
      return schoolYears[0].academicYear;
      // setSelectedAcademicYear(schoolYears[0].academicYear);
    }
    return "";
  });
  //  DISPATCH TO DISPATCH FOR SETTING YEAR

  useEffect(() => {
    dispatch(setAcademicYear(selectedAcademicYear));
  }, [dispatch, selectedAcademicYear]);
  const schoolYear = useSelector((state) => state.global.academicYear);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
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
            <FormControl sx={{ border: "0px",minWidth:160 }} fullWidth size="small">
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
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;