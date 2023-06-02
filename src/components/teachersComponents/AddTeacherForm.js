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

// COMPONENT TO ADD A NEW STUDENT USING POP UP MODAL
const AddteacherForm = ({newTeacher,handleChange,onSubmit,open,handleOpen,handleClose,isSending}) => {
  const theme = useTheme();
 

  return (
    <>
      <Button size="small" sx={{ display: "flex",border:"solid 1.5px",textTransform:"none",
      color:"inherit",padding:"8px" }} onClick={handleOpen}>
          <Add />
        Add new teacher...
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
                Add Teacher
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
                label="Registration Number"
                type="registrationNumber"
                id="registrationNumber"
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={handleChange}
              />
              {/* <FormControl
                variant="outlined"

                sx={{ minWidth: 230, alignSelf: "start", mb: 4 }}
              >
                <InputLabel id="academicLevel">Academic Level</InputLabel>
                <Select
                  name="academicLevel"
                  labelId="category"
                  id="academicLevel"
                  value={newStudent.academicLevel}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>A-Level</em>
                  </MenuItem>
                  <MenuItem value="O-Level">O-Level</MenuItem>
                  <MenuItem value="A-Level">A-Level</MenuItem>
                </Select>
              </FormControl> */}
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
                Add teacher
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

export default AddteacherForm;
