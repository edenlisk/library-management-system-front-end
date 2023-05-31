import React, { useState } from "react";
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
const AddClassForm = ({ newClass, setNewClass, handleChange, onSubmit }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  //  TODO:ADD FORM VALIDATION PREVENTING SUBMITION OF EMPTY INPUT OBJECT

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size="small" sx={{ display: "flex",border:"solid 1.5px",textTransform:"none",
      color:"inherit",padding:"8px" }} onClick={handleOpen}>
          <Add />
          Add new class...
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
                Add New Class
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
              {/* <TextField
                required
                fullWidth
                name="id"
                label="ID"
                type="number"
                id="id"
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={handleChange}
              /> */}
              <FormControl
                variant="outlined"
                sx={{ minWidth: 230, alignSelf: "start", mb: 4 }}
              >
                <InputLabel id="category">Academic Level</InputLabel>
                <Select
                  name="category"
                  labelId="category"
                  id="category"
                  value={newClass.category}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>A-Level</em>
                  </MenuItem>
                  <MenuItem value="O-Level">O-Level</MenuItem>
                  <MenuItem value="A-Level">A-Level</MenuItem>
                </Select>
              </FormControl>
              <Box display="flex" gap={2} sx={{ alignSelf: "start" }}>
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ mb: 2, width: "200px", alignSelf: "start" }}
                >
                  Add class
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

export default AddClassForm;
