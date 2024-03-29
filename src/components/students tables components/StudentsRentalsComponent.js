// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useTheme } from "@emotion/react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import {
//   useCreateRentalMutation,
//   useDeleteRentalMutation,
//   useGetRentalsQuery,
// } from "../../states/apiSlice";
// import {
//   ChevronLeft,
//   ChevronRightOutlined,
//   DeleteOutlinedIcon,
//   ModeEditOutlinedIcon,
// } from "@mui/icons-material";
// import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import AddBookRental from "./AddBookRental";
// import dayjs from "dayjs";

// const StudentsRentalsComponent = () => {
//   const { studentId } = useParams();
//   const theme = useTheme();

//   const navigate = useNavigate();

//   const academicYear = useSelector((state) => state.global.academicYear);

//   const [selectedId, setSelectedId] = useState();

//   const [createRental] = useCreateRentalMutation();
//   const [deleteRental] = useDeleteRentalMutation();

//   const { data, isLoading, isSuccess, isError, error } = useGetRentalsQuery({
//     academicYear,
//     studentId,
//   });
//   let rows = [];
//   if (isLoading) {
//     console.log("loading");
//   }
//   if (isError) {
//     console.log(`the api provided error: ${error}`);
//   }
//   if (isSuccess) {
//     const { data: rentalsinfo } = data;
//     const { rentalHistory } = rentalsinfo;
//     console.log(rentalHistory);
//     rows = rentalHistory;
//   }

//   const [rental, setRental] = useState({
//     nameOfBook: "",
//     bookId: "",
//     category: "",
//     studentId: studentId,
//     academicYear: academicYear,
//     issueDate: null,
//     dueDate: null,
//   });

//   const handleChange = (e) => {
//     setRental({ ...rental, [e.target.name]: e.target.value });
//   };

//   const handleStartDateChange = (newDate) => {
//     setRental((prevState) => ({
//       ...prevState,
//       issueDate: newDate.format("MM/DD/YYYY"),
//     }));
//   };

//   const handleEndDateChange = (newDate) => {
//     setRental((prevState) => ({
//       ...prevState,
//       dueDate: newDate.format("MM/DD/YYYY"),
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const body = { ...rental };
//     await createRental({ body, academicYear, studentId });
//     console.log(rental);
//     setRental({
//       nameOfBook: "",
//       bookId: "",
//       studentId: studentId,
//       academicYear: academicYear,
//       category: "",
//       issueDate: null,
//       dueDate: null,
//     });
//   };

//   const handleRowDelete = async (id) => {
//     const rentalId = id;
//     await deleteRental(rentalId);
//     console.log(typeof rentalId);
//   };

//   const columns = [
//     { field: "nameOfBook", headerName: "Book name", flex: 0.4 },
//     { field: "bookId", headerName: "ID", flex: 0.4 },
//     { field: "category", headerName: "category", flex: 0.3 },
//     { field: "issueDate", headerName: "Issue date", flex: 0.4 },
//     { field: "dueDate", headerName: "Due date", flex: 0.4 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <Stack direction="row" spacing={1}>
//           <Tooltip title="Delete" placement="top" arrow>
//             <IconButton
//               aria-label="delete"
//               onClick={() => handleRowDelete(params.id)}
//             >
//               <DeleteOutlinedIcon sx={{ fontSize: 20 }} />
//             </IconButton>
//           </Tooltip>

//           <Link to={`/edit/rental/${params.id}`}>
//             <Tooltip title="edit" placement="top" arrow>
//               <IconButton
//                 aria-label="edit"
//                 onClick={() => {
//                   console.log(`Button clicked for row ${params.id}`);
//                 }}
//               >
//                 <ModeEditOutlinedIcon sx={{ fontSize: 20 }} />
//               </IconButton>
//             </Tooltip>
//           </Link>
//         </Stack>
//       ),
//     },
//   ];
//   return (
//     <Grid2
//       container
//       flexDirection="column"
//       disableEqualOverflow
//       spacing={2}
//       padding="0px 26px"
//     >
//       <Grid2 xs={12} display="flex" justifyContent="start">
//         <ChevronLeft onClick={() => navigate(-1)} />
//       </Grid2>
//       <Grid2
//         xs={12}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Typography variant="h4">{""}:academicYear</Typography>
//         <AddBookRental
//           rental={rental}
//           format="MM/DD/YYYY"
//           setRental={setRental}
//           handleChange={handleChange}
//           onSubmit={handleSubmit}
//           handleStartDateChange={handleStartDateChange}
//           handleEndDateChange={handleEndDateChange}
//         />
//       </Grid2>
//       <Grid2 xs={12} display="flex" justifyContent="start">
//         <Box
//           sx={{
//             width: "100%",
//             height: "600px",
//           }}
//         >
//           <DataGrid
//             sx={{
//               width: "100%",
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: theme.palette.primary[800],
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 backgroundColor: theme.palette.primary[800],
//               },
//               "& .MuiDataGrid-virtualScroller": {},
//             }}
//             columns={columns}
//             rows={rows}
//             getRowId={(row) => row._id}
//             disableColumnFilter
//             disableColumnSelector
//             disableDensitySelector
//             autoHeight
//             slots={{ toolbar: GridToolbar }}
//             slotProps={{
//               toolbar: {
//                 showQuickFilter: true,
//                 quickFilterProps: { debounceMs: 500 },
//               },
//             }}
//             initialState={{
//               ...rows.initialState,
//               pagination: { paginationModel: { pageSize: 8 } },
//             }}
//             pageSizeOptions={[8, 16, 24]}
//             item="true"
//           />
//         </Box>
//       </Grid2>
//     </Grid2>
//   );
// };

// export default StudentsRentalsComponent;
