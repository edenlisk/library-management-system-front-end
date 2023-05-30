import React, {useState} from "react";
import Button from "@mui/material/Button";
import {FileDownloadOutlined} from "@mui/icons-material";
import {useNotificationReportMutation} from "../states/apiSlice";
import {Box} from "@mui/material";


const GenerateNotificationReport = () => {
    const [notificationReport, {data}] = useNotificationReportMutation();
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        const response = await notificationReport();

        const url = window.URL.createObjectURL(
            new Blob([response.data], {type: "application/pdf"})
        );
        window.open(url);
        setIsLoading(false);
    };

    return (
        <div>
          <Box
              variant="contained"
              component="label"
              sx={{fontSize: "11px"}}
              onClick={handleGenerate}
              disabled={isLoading}
          >
            {isLoading ? (
                <Button disabled>Generating Report ...</Button>
            ) : (
                <Button
                    variant="contained"
                    startIcon={<FileDownloadOutlined sx={{fontSize: "10.8px"}}/>}
                    sx={{fontSize: "10.8px"}}
                >
                    Download PDF
                </Button>
            )}
          </Box>
        </div>
    );
}

export default GenerateNotificationReport;