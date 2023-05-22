import React from 'react';
import { Paper, Typography } from '@mui/material';


const CardComponent = () => {
    const data = [
        { title: 'Title 1', number: 10, color: "025464" },
        { title: 'Title 2', number: 20, color: "E57C23" },
        { title: 'Title 3', number: 30, color: "E8AA42" },
    ];

// Inside your component
    return (
        <div>
            {data.map((item, index) => (
                <Paper key={index} elevation={3} style={{ padding: 16, marginBottom: 16, width: '10rem', backgroundColor: item.color }}>
                    <Typography variant="h6" gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography variant="h4">
                        {item.number}
                    </Typography>
                </Paper>
            ))}
        </div>
    );
};

export default CardComponent;
