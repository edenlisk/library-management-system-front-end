import React from "react";
import {Box, Modal, Typography, Fade} from "@mui/material";
import {CloseOutlined} from "@mui/icons-material";


const ConfirmationAfterUploading = ({open, handleCloseDialog}) => {


    return (

        <Modal
            open={open}
            aria-labelledby="add-modal-title"
            aria-describedby="add-modal-description"
        >
            <Fade in={open}>
                <Box>
                    <CloseOutlined sx={{alignSelf: "end", padding: "0px 0px 3px 3px"}} onClick={handleCloseDialog}/>
                </Box>
            </Fade>
        </Modal>
    )
}

export default ConfirmationAfterUploading;