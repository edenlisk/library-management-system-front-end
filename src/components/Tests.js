import React, { useState, useEffect } from "react";
// import {
//   DataGrid,
// //   GridToolbar,
//   GridToolbarContainer,
//   GridToolbarExport,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
// } from "@material-ui/core";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  useGetClassesQuery,
  useGetAcademicYearsQuery,
} from "../states/apiSlice";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
  OutlinedInput,
  CircularProgress,
  Fade,
  Modal,
  FormHelperText,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Accordion,AccordionSummary,AccordionDetails
} from "@mui/material";
import {
  LoginOutlined,
  Visibility,
  VisibilityOff,
  PersonAdd,
  Email,
  PointOfSale,
  Traffic,
  WarningRounded,
 ExpandMore
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import StatBox from "./StatBox";
// import LoadingButton from '@mui/lab/LoadingButton';
// import SaveIcon from '@mui/icons-material/Save';
// import Stack from '@mui/material/Stack';

// ACTION USED TO STORE YEAR
import { setAcademicYear } from "../states/slice";
// import MyResponsiveLine from "./Datachart";
import { MyResponsivePie,MyResponsiveLine } from "./dashboard/Graphs";


// const rows = [
//   { id: 1, name: "John", age: 25, email: "john@example.com" },
//   { id: 2, name: "Jane", age: 30, email: "jane@example.com" },
// ];

// const columns = [
//   { field: "name", headerName: "Name", width: 150 },
//   { field: "age", headerName: "Age", width: 150 },
//   { field: "email", headerName: "Email", width: 250 },
// ];

// const CustomToolbar = () => {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// };

// const CustomRow = ({ row }) => {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpand = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Accordion expanded={expanded}>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         onClick={handleExpand}
//       >
//         <Typography>{row.name}</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Typography>
//           Age: {row.age}, Email: {row.email}
//         </Typography>
//       </AccordionDetails>
//     </Accordion>
//   );
// }

const columns = [
  // {
  //   field:`_id`,
  //   headerName:"Id",
  //   flex:1
  // },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
  },
  {
    field: "numberOfStudents",
    headerName: "Number of Students",
    flex: 1,
  },
  {
    field: "academicYear",
    headerName: "Academic Year",
    flex: 1,
  },
];
const Tests = () => {
  // FETCH ACADEMIC YEARS
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAcademicYear(selectedAcademicYear));
  }, [dispatch, selectedAcademicYear]);
  const schoolYear = useSelector((state) => state.global.academicYear);

  //FUNCTION FOR THE MENU LIST

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [loadtr, setLoadtr] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLoadtr = () => {
    setLoadtr(!loadtr);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // SELECT COMPONENT STATE

  const handleChange = (event) => {
    setSelectedAcademicYear(event.target.value);
  };
  // console.log(selectedAcademicYear);

  // TESTING DATA FETCH TO BE EXPORTED LATER TO CLASSLISTPAGE
  const { data, isLoading, isSuccess, isError, error } =
    useGetClassesQuery(schoolYear);
  // console.log(data);
  let rows = [];
  if (isLoading) {
    console.log("loading");
  }
  if (isError) {
    console.log(`the api provided error: ${error}`);
  }
  if (isSuccess) {
    const { data: classes } = data;
    const { classes: klasses } = classes;
    rows = klasses;
    // rows.forEach(element => {
    //   element.studentNumber=element.students.length;
    // });
    // console.log(rows);
    // console.log(rows.numberOfStudents)
  }
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

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

  // const BookNotify=({BKname,total,remaining,id})=>{

  //   return(
  //     <Box padding={4.5} display="flex" gap={0.5} alignItems="center">
  //     <WarningRounded color="warning" sx={{ fontSize: 26 }}/>
  //     <Typography variant="h5">Book:<span style={{fontWeight:"bold"}}> {BKname}</span> is at it's limit <span style={{color:"red"}}>{`(${remaining} of ${total})`}</span> is remaining.</Typography>
  //   </Box>
  //   )
  // }
  return (
    // <div style={{ height: 400, width: "100%" }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     components={{
    //       Toolbar: CustomToolbar,
    //       Row: CustomRow,
    //     }}
    //   />
    // </div>
    <>
      {/* {loadtr ? (
        <Button
          variant="contained"
          size="small"
          disabled={loadtr}
          startIcon={<CircularProgress size={20} />}
          onClick={handleLoadtr}
        >
          Adding
        </Button>
      ) : (
        <Button size="small" variant="contained" onClick={handleLoadtr}>
          Add value
        </Button>
      )}

      <Button onClick={handleOpenModal}>open modal</Button>

      <Typography variant="h5">we are testing....</Typography>
      <Box height="500px" width="100%">

        <Button
          id="gauge-button"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="false"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
 
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "gauge-button",
          }}
          sx={{
            "& .MuiList-root": {
              backgroundColor: "",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        <DataGrid
          loading={isLoading || !rows}
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
        />
        <FormControl sx={{ minWidth: 125 }} size="small">
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAcademicYear}
            label="Age"
            onChange={(event) => {
              setSelectedAcademicYear(event.target.value);

            }}
          >

            <MenuItem selected value="2023-2024">
              2023-2024
            </MenuItem>
            <MenuItem value="2024-2025">2024-2025</MenuItem>
            <MenuItem value="2025-2026">2025-2026</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Modal
        open={openModal}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"

      >
        <Fade in={openModal}>
          <Box maxWidth={700} height="100%" margin="auto" padding={3}>
            <Box
              component="form"
              maxWidth={440}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="70%"
              margin="auto"
              p="10px 10px"
              boxShadow={"1.5px 1.5px 10px #ccc"}
              padding={2}
              borderRadius="7px"
              marginTop="20px"
              backgroundColor={theme.palette.primary[900]}
            >
              <Typography variant="h3" sx={{ textAlign: "center", mb: 3 }}>
                Account Login
              </Typography>
              <TextField
                required
                fullWidth
                name="email"
                placeholder=" Email"
                label="Email"
                type="Email"
                id="standard-basic"
                variant="outlined"
                
                sx={{ mb: 2 }}
               
              />

              <FormControl
                variant="outlined"
                required
                fullWidth
                
                sx={{ mb: 2 }}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type= "text" 
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                      
                        edge="end"
                      >
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />

                <FormHelperText id="password">
                </FormHelperText>
              </FormControl>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{ mb: 2, width: "100px", alignSelf: "start" }}
                endIcon={<LoginOutlined />}
              >
                Login
              </Button>
              <Typography
                variant="p"
                sx={{ alignSelf: "start", paddingRight: "4px" }}
              >
                Forgot Password ?{" "}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal> */}

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        p="0px 17px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        
        <StatBox
          title="Total Customers"
          // value={data && data.totalCustomers}
          increase="+14%"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          // value={data && data.todayStats.totalSales}
          increase="+21%"

          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
                <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        p="16px"
        borderRadius="0.55rem"
      ><MyResponsivePie /> </Box>
        <StatBox
          title="Monthly Sales"
          // value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          // value={data && data.yearlySalesTotal}
          increase="+43%"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
                <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="16px"
          borderRadius="0.55rem"
        ><MyResponsiveLine /> </Box>

      </Box>
{/* <Box padding={3.5}>
      <Accordion sx={{backgroundColor:theme.palette.background.default,'& .MuiAccordionDetails-root': { padding: 0 },'& .MuiBox-root': { padding:1 }}}>
      <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">Books</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {criticalBooks.map(({BKname,total,remaining,id})=>(<BookNotify key={id}
        BKname={BKname} total={total} remaining={remaining}/>))}

        </AccordionDetails>
      </Accordion>
      </Box> */}
      
    </>
  );
};

export default Tests;
