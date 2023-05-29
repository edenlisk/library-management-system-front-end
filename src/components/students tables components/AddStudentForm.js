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
} from "@mui/material";
import { CloseOutlined,Add } from "@mui/icons-material";

// COMPONENT TO ADD A NEW STUDENT USING POP UP MODAL
const AddStudentForm = ({newStudent,handleChange,onSubmit,open,handleOpen,handleClose}) => {
  const theme = useTheme();
 

  return (
    <>
      <Toolbar sx={{ display: "flex" }} onClick={handleOpen}>
        <IconButton>
          <Add />
        </IconButton>
        <Typography variant="h6">Add new student...</Typography>
      </Toolbar>

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
                // backgroundColor={theme.palette.neutral.main}
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                variant="outlined"
                // changing input color on each input field
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
              <Box display="flex" gap={2} sx={{ alignSelf: "start" }}>
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                >
                  Add student
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  type="button"
                  onClick={handleClose}
                  sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                >
                  cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddStudentForm;
