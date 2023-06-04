import React from "react";
import {
  IconButton,
  Modal,
  Fade,
  Box,
  TextField,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Toolbar,
  Button,
  CircularProgress
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CloseOutlined,Add } from "@mui/icons-material";

const AddStudentForm = ({newStudent,handleChange,onSubmit,open,handleOpen,handleClose,isSending}) => {
  const theme = useTheme();
 

  return (
    <>
      <Button 
      size="small" sx={{ display: "flex",border:"solid 1.5px",textTransform:"none",
      color:"inherit",padding:"8px" }} onClick={handleOpen}>    
          <Add />
        Add new student...
      </Button>

      <Modal
        open={open}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Fade in={open}>
          <Box maxWidth={700} height="100%" margin="auto" padding={3}>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              justifyContent="top"
              alignItems="center"
              borderRadius="12px"
              height="90%"
              sx={{ p: "10px 10px" }}
              backgroundColor={theme.palette.primary[900]}
              onSubmit={onSubmit}
            >
              <CloseOutlined sx={{ alignSelf: "end" }} onClick={handleClose} />
              <Typography
                variant="h3"
                sx={{ textAlign: "center", mb: 3, mt: 3 }}
              >
                Add Student
              </Typography>
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                variant="outlined"
                sx={{
                  mb: 2,
                }}
                onChange={handleChange}
              />
              <TextField
                required
                fullWidth
                name="registrationNumber"
                label="registrationNumber"
                type="registrationNumber"
                id="registrationNumber"
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={handleChange}
              />
              <Grid2 container justifyContent="start" alignSelf="start" width="100%">
                <Grid2 xs={6}>
                {isSending?<Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  disabled
                  startIcon={<CircularProgress size={20}/>}
                  sx={{ mb: 2, width: "90%", alignSelf: "start" }}
                >
                Adding  
                </Button>:<Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ mb: 2, width: "90%", alignSelf: "start" }}
                >
                  Add student
                </Button>}
                </Grid2>
                <Grid2 xs={6}>
                <Button
                  variant="contained"
                  size="medium"
                  type="button"
                  onClick={handleClose}
                  sx={{ mb: 2, width: "90%", alignSelf: "start" }}
                >
                  cancel
                </Button>
                </Grid2>
              </Grid2>

            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddStudentForm;
