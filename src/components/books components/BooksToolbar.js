import React, {useState} from "react";
import {GridToolbarContainer, GridToolbarQuickFilter} from "@mui/x-data-grid";
import FlexBetween from "../FlexBetween";
import FileUploadBooks from "./FileUploadBooks";
import GenerateClassReport from "../GenerateClassReport";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import AddBook from "./AddBook";

const BooksToolbar = () => {
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween sx={{gap: 1, mb: 1}}>
                    <FileUploadBooks/>
                </FlexBetween>
                <FlexBetween>
                    <GridToolbarQuickFilter/>
                </FlexBetween>
            </FlexBetween>
        </GridToolbarContainer>
    )
}

export default BooksToolbar;