import React from "react";
import {useTopStudentsQuery} from "../../states/apiSlice";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {Bars} from "react-loader-spinner";
import {useSelector} from "react-redux";


const TopStudents = () => {
    const academicYear = useSelector(state => state.global.academicYear);
    const {data, isSuccess, isLoading} = useTopStudentsQuery(academicYear || '2023-2024');
    let rows = [];
    if (isSuccess) {
        const {data: students} = data;
        const {result: topStudents} = students;
        rows = topStudents;
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', margin: ''}}>
                <Typography variant="h3">Top Students</Typography>
            </div>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Number of rentals</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ?
                                <TableRow>
                                    <TableCell>
                                        {null}
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <Bars
                                            height="100"
                                            width="90"
                                            color="#FFE3A3"
                                            ariaLabel="bars-loading"
                                            visible={true}
                                        />
                                    </TableCell>
                                </TableRow>
                                :
                                rows.map((student, index) => {
                                    return (
                                        <TableRow key={index} hover>
                                            <TableCell><Typography fontWeight="bold">{index + 1}</Typography></TableCell>
                                            <TableCell><Typography variant="h5">{student.name}</Typography></TableCell>
                                            <TableCell sx={{textAlign: 'center'}}><Typography
                                                variant="h5">{student.numberOfRentals}</Typography></TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>


                </Table>
            </TableContainer>
        </div>
    )
}

export default TopStudents;