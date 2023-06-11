import React, {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {
    FormHelperText,
    TextField,
    Typography,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Box,
    MenuItem,
    Select,
    FormControl,
    FormControlLabel,
    Checkbox,
    CircularProgress
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {LoginOutlined,ChevronLeftOutlined} from "@mui/icons-material";
import {useUpdateRentalMutation, useGetOneRentalQuery} from "../states/apiSlice";
import {toast} from "react-toastify";

// TO ADD A BOOLEAN TO MAKE FIELDS RED WHEN THERE IS AN ERROR

const EditRentalPage = () => {
    const {rentalId} = useParams();
    const navigate = useNavigate();

    const {data, isLoading, isSuccess} = useGetOneRentalQuery(rentalId);
    const [rental, setRental] = useState({nameOfBook: "", dueDate: null, active: false, returned: false});


    const [updateRental, {isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError,isLoading:isUpdating}] = useUpdateRentalMutation();

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success("Settings updated successfully")
        } else if (isUpdateError) {
            const { data:fullError } = updateError;
            const {message} = fullError;
            toast.error(message);
        }
    }, [isUpdateError, isUpdateSuccess]);
    let forminfo = {};

    useEffect(() => {
        if(isSuccess) {
            const {data: info} = data;
            const {rental: rentals} = info;
            setRental({nameOfBook: rentals.nameOfBook, dueDate: rentals.dueDate.split('T')[0], active: rentals.active, returned: rentals.returned})
            // forminfo = rentals;
        }
    }, [isSuccess, data]);



    // TAKES INPUT FROM INPUT FIELDS
    const handleChange = (e) => {
        setRental({...rental, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,});
    };

    const handleEndDateChange = (newDate) => {
        setRental((prevState) => ({
            ...prevState,
            dueDate: newDate.format("YYYY-MM-DD")
        }));
    };
    const handleActive = () => {
        setRental(prevState => ({...prevState, active: !prevState.active}));
    }


    // SUBMITS DATA IN THE INPUTS FIELDS
    const handleSubmit = async (event) => {
        event.preventDefault();
        const body = {...rental};
        await updateRental({body, rentalId});
        setRental({
            nameOfBook: "",
            dueDate: null,
            active: false,
            returned: false
        });
        navigate(-1);
    };

    return (
        <Box height="100%">
            <ChevronLeftOutlined onClick={()=>navigate(-1)}/>
            <Box
                component="form"
                onSubmit={handleSubmit}
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
            >
                <Typography variant="h3" sx={{textAlign: "center", pb: 3}}>
                    Edit Rental Info
                </Typography>
                <TextField
                    required
                    fullWidth
                    value={rental.nameOfBook}
                    name="nameOfBook"
                    label="Name Of Book"
                    type="text"
                    id="nameOfBook"
                    variant="outlined"
                    onChange={handleChange}
                    sx={{mb: 2}}
                    disabled={rental.returned}
                />
                <DatePicker
                    // disablePast
                    value={dayjs(new Date(rental.dueDate))}
                    onChange={handleEndDateChange}
                    format="YYYY-MM-DD"
                    sx={{minWidth: 230, alignSelf: "start", mb: 2}}
                    disabled={rental.returned}
                />

                <FormControlLabel
                    sx={{alignSelf: "start"}}
                    control={
                        <Checkbox
                            name="active"
                            checked={rental.active}
                            onChange={handleActive}
                            disabled={rental.returned}
                        />
                    }
                    label="Active"
                />

                {isUpdating?<Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    sx={{mb: 2, width: "100px", alignSelf: "start"}}
                    startIcon={<CircularProgress size={20}/>}
                    disabled
                >
                    saving
                </Button>:<Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    sx={{mb: 2, width: "100px", alignSelf: "start"}}
                   
                    disabled={rental.returned}
                >
                    save
                </Button>}
            </Box>
        </Box>
    );
};

export default EditRentalPage;
