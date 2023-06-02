import React, {useState} from "react";
import {
    Box,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Button,
    Modal,
    useTheme,
    Fade,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import {
    CloseOutlined
} from "@mui/icons-material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const LibrarianModal = ({
                            open,
                            handleClosePopup,
                            isUpdating,
                            targetLibrarian,
                            handleOpenModal,
                            handleUpdate,
                            modifyUser
                        }) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (

        <Modal
            open={open}
            aria-labelledby="add-modal-title"
            aria-describedby="add-modal-description"
        >
            <Fade in={open}>
                <Box padding="5px 20px 0 20px" display='flex' justifyContent="center">
                    <Box component="form" onSubmit={handleUpdate} sx={{
                        p: 4.5,
                        pt: 2,
                        width: "70%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px"
                    }}
                         backgroundColor={theme.palette.primary[900]}>
                        <CloseOutlined sx={{alignSelf: "end", padding: "0px 0px 3px 3px"}} onClick={handleClosePopup}/>
                        <Typography variant="h2">Update Librarian</Typography>
                        <Grid2 container spacing={2}
                        >

                            <Grid2
                                xs={12}
                                container
                                display="flex"
                                justifyContent="start"
                                alignItems="center"

                            >
                                <Grid2 xs={4} md={2}>
                                    <Typography variant="p">Name</Typography>
                                </Grid2>
                                <Grid2 xs={8} md={10}>
                                    <TextField
                                        label="Librarian Name"
                                        sx={{width: "80%"}}
                                        name="name"
                                        id="Name"
                                        type="text"
                                        variant="outlined"
                                        value={targetLibrarian.name}
                                        onChange={modifyUser}
                                    />
                                </Grid2>

                                <Grid2 xs={4} md={2}>
                                    <Typography variant="p">User Name</Typography>
                                </Grid2>
                                <Grid2 xs={8} md={10}>
                                    <TextField
                                        label="User Name"
                                        sx={{width: "80%"}}
                                        name="username"
                                        id="Username"
                                        type="text"
                                        variant="outlined"
                                        value={targetLibrarian.username}
                                        onChange={modifyUser}
                                    />
                                </Grid2>

                                <Grid2 xs={4} md={2}>
                                    <Typography variant="p">Email</Typography>
                                </Grid2>
                                <Grid2 xs={8} md={10}>
                                    <TextField
                                        label="Email"
                                        sx={{width: "80%"}}
                                        name="email"
                                        id="email"
                                        type="email"
                                        variant="outlined"
                                        value={targetLibrarian.email}
                                        onChange={modifyUser}
                                    />
                                </Grid2>

                                <Grid2 xs={4} md={2}>
                                    <Typography variant="p">Password</Typography>
                                </Grid2>
                                <Grid2 xs={8} md={10}>
                                    <FormControl
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={modifyUser}
                                        sx={{mb: 2, width: "80%"}}
                                    >
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={targetLibrarian.password}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />

                                    </FormControl>
                                </Grid2>
                                <Grid2 xs={4} md={2}>
                                    <Typography variant="p">Confirm Password</Typography>
                                </Grid2>
                                <Grid2 xs={8} md={10}>
                                    <FormControl
                                        variant="outlined"
                                        required
                                        fullWidth
                                        onChange={modifyUser}
                                        sx={{mb: 2, width: "80%"}}
                                    >
                                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="passwordConfirm"
                                            name="passwordConfirm"
                                            type={showPassword ? "text" : "password"}
                                            value={targetLibrarian.passwordConfirm}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm Password"
                                        />
                                    </FormControl>
                                </Grid2>

                                <Grid2 container gap={2} display="flex" justifyContent="center" xs={12}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? "Updading" : "Update"}
                                    </Button>
                                    <Button variant="contained" type="button" onClick={handleClosePopup}>
                                        cancel
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>

            </Fade>
        </Modal>
    );
};

export default LibrarianModal;
