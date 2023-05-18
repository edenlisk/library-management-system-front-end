import React, { useState } from 'react';
import { useGenerateClassReportMutation } from '../states/apiSlice';
import Button from "@mui/material/Button";

const GenerateClassReport = () => {
    const [generateClassReport, { data }] = useGenerateClassReportMutation();
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        const response = await generateClassReport('');

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

export default GenerateClassReport;
