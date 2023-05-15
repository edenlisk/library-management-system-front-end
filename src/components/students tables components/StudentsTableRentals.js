import 'bootstrap/dist/css/bootstrap.min.css';
import { DataGrid,GridToolbar } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import React from 'react'
import { useTheme } from '@emotion/react';
const StudentsTableRentals = ({rows}) => {
const columns=[
 
    { field: 'nameOfBook', headerName: 'Book name', flex:1, },
    { field: 'bookId', headerName: 'ID', flex:1, },
    { field: 'issueDate', headerName: 'Issue date', flex:1, },
    { field: 'dueDate', headerName: 'Due date', flex:1, },
    { field: 'nameOfLender', headerName: 'Lender', flex:1, },
   {
    field: 'actions', headerName: 'Actions',flex:1,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        {/* icons only */}
       <IconButton aria-label="delete">
        <DeleteOutlinedIcon sx={{fontSize:20}} />
      </IconButton>
      <IconButton  aria-label="edit"
       onClick={() => {
        console.log(`Button clicked for row ${params.id}`);
      }}>
        <ModeEditOutlinedIcon sx={{fontSize:20}} />
      </IconButton> 
      {/* buttons with icons and text */}
      {/* <Button variant="outlined" size="small" startIcon={ <DeleteOutlinedIcon sx={{fontSize:15}} />}>
        Delete
      </Button>
      <Button variant="outlined" size="small" startIcon={<ModeEditOutlinedIcon sx={{fontSize:15}} 
             onClick={() => {
              console.log(`Button clicked for row ${params.id}`);
            }}/>}>
        Edit
      </Button> */}
    </Stack>
    
    ),
  },
]

  const theme=useTheme();
  return (
    <div >
        <DataGrid sx={{height:700,width:"100%","& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.primary[800],
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.primary[800],
        },
        "& .MuiDataGrid-virtualScroller": {},}}
        columns={columns}
        rows={rows}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        autoHeight
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        initialState={{
          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        pageSizeOptions={[8, 16, 24]}
        />
    </div>
  )
}

export default StudentsTableRentals