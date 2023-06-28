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
import { DatePicker } from "@mui/x-date-pickers";
import { CloseOutlined,Add } from "@mui/icons-material";

const AddTeacherBookRental = ({ rental,format, handleChange, onSubmit,handleStartDateChange,handleEndDateChange,openModal,handleModalOpen,handleModalClose }) => {
  const theme = useTheme();



  return (
    <>
      <Toolbar sx={{ display: "flex" }} onClick={handleModalOpen}>
        <IconButton>
          <Add />
        </IconButton>
        <Typography variant="h6">Add new book rental...</Typography>
      </Toolbar>

      <Modal
        open={openModal}
        aria-labelledby="add new book rental"
        aria-describedby="Adding a new book rental for a particular individul"
      >
        <Fade in={openModal}>
          <Box maxWidth={700} height="100%" margin="auto" padding={3}>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              justifyContent="top"
              alignItems="center"
              height="90%"
              sx={{ p: "10px 10px" }}
              backgroundColor={theme.palette.primary[500]}
              onSubmit={onSubmit}
            >
              <CloseOutlined sx={{ alignSelf: "end" }} onClick={handleModalClose} />
              <Typography
                variant="h3"
                sx={{ textAlign: "center", mb: 3, mt: 3 }}
              >
                Add Book Rental
              </Typography>
              <TextField
                backgroundcolor={theme.palette.neutral.main}
                required
                fullWidth
                name="nameOfBook"
                label="nameOfBook"
                type="text"
                id="nameOfBook"
                variant="outlined"
                // changing input color on each input field
                sx={{
                  mb: 2,
                }}
                onChange={handleChange}
              />
              <TextField
                backgroundcolor={theme.palette.neutral.main}
                required
                fullWidth
                name="numberOfBook"
                label="Number OfBook"
                type="text"
                id="numberOfBook"
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
                name="rentalFor"
                label="Rented For"
                type="text"
                id="rentalFor"
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={handleChange}
              />
              <TextField
                required
                fullWidth
                name="teacherId"
                label="Teacher Id"
                type="text"
                id="teacherId"
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={handleChange}
              />
              <Box display="flex" gap={2} sx={{ alignSelf: "start" }}>
              </Box>

              <Box display="flex" gap={2} sx={{ alignSelf: "start", mb: 2 }}>
                {/* to add date pickers isued and due dates */}
                <DatePicker disablePast disableFuture
                required
                label="Issue Date"
                value={rental.issueDate}
                onChange={handleStartDateChange}
                format={format}/>
                <DatePicker disablePast
                label="Due Date"
                value={rental.dueDate}
                onChange={handleEndDateChange}
                format={format} />
              </Box>
              <Box display="flex" gap={2} sx={{ alignSelf: "start" }}>
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ alignSelf: "start",backgroundColor:theme.palette.buttons.main }}
                >
                  Add Rental
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  type="button"
                  onClick={handleModalClose}
                  sx={{ alignSelf: "start",backgroundColor:theme.palette.buttons.main }}
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

export default AddTeacherBookRental;
