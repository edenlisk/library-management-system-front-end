import {GridToolbarContainer, GridToolbarQuickFilter} from "@mui/x-data-grid";
import FlexBetween from "../FlexBetween";
import React from "react";
import {Box} from "@mui/material";


const LostBooksToolBar = () => {
    return (
        <GridToolbarContainer>
            <Box width="100%" display="flex" justifyContent="end">
                <GridToolbarQuickFilter/>
            </Box>
        </GridToolbarContainer>
    )
}

export default LostBooksToolBar;