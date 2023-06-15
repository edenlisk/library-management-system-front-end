import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    TextField,
    Typography,
    Button,
    Box,
    FormControlLabel,
    Checkbox,
    Stack,
    CircularProgress,
    IconButton,
    useTheme,
    Skeleton
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {LoginOutlined,ChevronLeftOutlined, DisabledByDefaultRounded, CheckBoxRounded} from "@mui/icons-material";
import {useUpdateRentalMutation, useGetOneRentalQuery} from "../states/apiSlice";
import {toast} from "react-toastify";

const EditRentalPage = () => {
    const {rentalId} = useParams();
    const navigate = useNavigate();
    const theme=useTheme();

    const {data, isLoading, isSuccess} = useGetOneRentalQuery(rentalId);
    const [rental, setRental] = useState({nameOfBook: "", dueDate: null, active: false, returned: false});
    const [rentalA, setRentalA] = useState( false);


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
            console.log(rentals)
        }
    }, [isSuccess, data]);

    const handleChange = (e) => {
        setRental({...rental, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,});
    };

    const handleEndDateChange = (newDate) => {
        setRental((prevState) => ({
            ...prevState,
            dueDate: newDate.format("YYYY-MM-DD")
        }));
    };
    const handleActive = (isActive) => {

        setRental((prevState) => ({...prevState, active: !isActive}));
        console.log(rental.active)
    }

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
               {isLoading?<Skeleton animation="wave"  sx={{ width:"100%",height:30 }}/>:<TextField
                    required
                    fullWidth
                    value={(rental.nameOfBook || "")}
                    name="nameOfBook"
                    label="Name Of Book"
                    type="text"
                    id="nameOfBook"
                    variant="outlined"
                    onChange={handleChange}
                    sx={{mb: 2}}
                    disabled={rental.returned}
                />}
                {isLoading?<Skeleton animation="wave"  sx={{ width:"100%",height:30 }}/>:<DatePicker
                    // disablePast
                    value={dayjs(new Date(rental.dueDate))|| null}
                    onChange={handleEndDateChange}
                    format="YYYY-MM-DD"
                    sx={{minWidth: 230, alignSelf: "start", mb: 2}}
                    disabled={rental.returned}
                />}

                {/* <FormControlLabel
                    sx={{alignSelf: "start"}}
                    control={
                        <Checkbox
                            name="active"
                            checked={rental.active || null}
                            onChange={handleActive}
                            disabled={rental.returned}
                        />
                    }
                    label="Active"
                /> */}
                <Box display="flex" justifyContent="center" alignItems="center" sx={{alignSelf: "start"}} flexDirection="rows">
                <IconButton  disabled={rental.returned} onClick={()=>handleActive(rental.active)}>
                {rental.active?<CheckBoxRounded color={rental.returned?"disabled":"success"}/>:<DisabledByDefaultRounded color={rental.returned?"disabled":"error"}/>}
                </IconButton>
                <Typography sx={{opacity:rental.returned? "0.5":"1"}}>active</Typography>
                </Box>

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
                    sx={{mb: 2, width: "100px", alignSelf: "start",backgroundColor:theme.palette.buttons.main}}
                   
                    disabled={rental.returned}
                >
                    save
                </Button>}
            </Box>
        </Box>
    );
};

export default EditRentalPage;
