import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardActions, TextField, Typography} from "@mui/material";
import {useGetSettingsQuery, useUpdateSettingsMutation} from "../states/apiSlice";
import {toast} from "react-toastify";


const Settings = () => {
    const [settings, setSettings] = useState({fineAmount: 0, fixedAmount: 0, graceDays: 0, inactivityDays: 0, limitPercentage: 0});
    const [updateSettings, {isLoading, isError, error, isSuccess}] = useUpdateSettingsMutation();
    const handleUpdate = async () => {
        const body = {...settings}
        await updateSettings({body});
        // if (data) {
        //     toast.success("Settings updated successfully")
        // }
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Settings updated successfully")
        } else if (isError) {
            const { data:fullError } = error;
            const {message} = fullError;
            toast.error(message);
        }
    }, [isError, isSuccess]);

    const handleChange = (e) => {
        e.preventDefault();
        setSettings(prevState => ({...prevState, [e.target.name]: e.target.value ? parseInt(e.target.value) : ''}))
    }

    const {data, isSuccess: isDone} = useGetSettingsQuery();
    useEffect(() => {
        if (isDone) {
            const {data: options} = data;
            const {settings} = options;
            setSettings(settings)
        }
    }, [isDone])
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Card elevation={3} sx={{
                backgroundColor: 'inherit',
                p: '1rem 0',
                width: '70%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography variant="h3">Lycee De Kigali LMS Settings</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    width: '100%',
                    m: '2rem 0',
                    padding: '0 3rem'
                }}>
                    <TextField
                        fullWidth
                        name="fineAmount"
                        label="Overdue Fine"
                        type="number"
                        variant="standard"
                        helperText="Amount to be added on overdue rentals"
                        value={settings.fineAmount}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        name="fixedAmount"
                        label="Fixed Fine"
                        type="number"
                        variant="standard"
                        helperText="Amount to be added on lost books"
                        value={settings.fixedAmount}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        name="graceDays"
                        label="Grace Days"
                        type="number"
                        variant="standard"
                        helperText="Number of days before recurring fine"
                        value={settings.graceDays}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        name="inactivityDays"
                        label="Inactivity Days"
                        type="number"
                        variant="standard"
                        helperText="Number of days given to lost books to be returned"
                        value={settings.inactivityDays}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        name="limitPercentage"
                        label="Rental limit percentage"
                        type="number"
                        variant="standard"
                        helperText="System will limit rentals when available copies of books falls under this percentage"
                        value={settings.limitPercentage}
                        onChange={handleChange}
                    />
                </Box>
                <CardActions>
                    <Button
                        onClick={handleUpdate}
                        variant="contained"
                        color="secondary"
                    >
                        Update Settings
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Settings;