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
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DatePicker } from "@mui/x-date-pickers";
import { CloseOutlined,Add } from "@mui/icons-material";

const RentalForm = ({ rental,format, handleChange, onSubmit,handleStartDateChange,handleEndDateChange,openModal,handleModalOpen,handleModalClose }) => {
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
                required
                fullWidth
                name="bookId"
                label="ID"
                type="number"
                id="id"
                variant="outlined"
                sx={{ mb: 2 }}
                onChange={handleChange}
              />
              <Box display="flex" gap={2} sx={{ alignSelf: "start" }}>
                <FormControl
                
                  variant="outlined"
                  sx={{ minWidth: 230, alignSelf: "start", mb: 4 }}
                >
                  <InputLabel id="category">Book Category</InputLabel>
                  <Select
                  required
                    name="category"
                    labelId="category"
                    id="category"
                    value={rental.category}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Others</em>
                    </MenuItem>
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Physics">Physics</MenuItem>
                    <MenuItem value="Chemistry">Chemistry</MenuItem>
                    <MenuItem value="Biology">Biology</MenuItem>
                    <MenuItem value="Geography">Geography</MenuItem>
                    <MenuItem value="Economics">Economics</MenuItem>
                    <MenuItem value="Entrepreneurship">
                      Entrepreneurship
                    </MenuItem>
                    <MenuItem value="History">History</MenuItem>
                    <MenuItem value="Kinyarwanda">Kinyarwanda</MenuItem>
                    <MenuItem value="Kiswahili">Kiswahili</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Literature">Literature</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex" gap={2} sx={{ alignSelf: "start", mb: 2 }}>
                {/* to add date pickers isued and due dates */}
                <DatePicker disablePast disableFuture
                required
                value={rental.issueDate}
                onChange={handleStartDateChange}
                format={format}/>
                <DatePicker disablePast
                value={rental.dueDate}
                onChange={handleEndDateChange}
                format={format} />
              </Box>
              <Grid2 container justifyContent="start" alignSelf="start" width="100%">
                <Grid2 xs={6}>
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ alignSelf: "start", width: "90%" }}
                >
                  Add Rental
                </Button>
                </Grid2>
                <Grid2 xs={6}>
                <Button
                  variant="contained"
                  size="medium"
                  type="button"
                  onClick={handleModalClose}
                  sx={{ alignSelf: "start" , width: "90%"}}
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

export default RentalForm;
