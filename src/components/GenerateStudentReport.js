import React, { useState } from 'react';
import { useGenerateStudentReportMutation } from '../states/apiSlice';
import Button from "@mui/material/Button";

const GenerateStudentReport = () => {
    const [generateStudentReport, { data }] = useGenerateStudentReportMutation();
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        const response = await generateStudentReport('6460e7903b70c49547bd5966');

        const url = window.URL.createObjectURL(
            new Blob([response.data], { type: 'application/pdf' })
        );
        window.open(url);

        setIsLoading(false);
    };

    return (
        <div>
            <Button
                sx={{ backgroundColor: 'cyan' }}
                onClick={handleGenerate}
                disabled={isLoading}
            >
                {isLoading ? 'Generating Report...' : 'Download Report'}
            </Button>
        </div>
    );
};

export default GenerateStudentReport;
