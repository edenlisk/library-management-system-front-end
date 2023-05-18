import { Chip, Stack } from "@mui/material";
import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";

const Status = ({returned}) => {

  return (
    <>
      {returned && (
        <Stack direction="row" spacing={1}>
          <Chip
            sx={{ backgroundColor: "#337010" }}
            // icon={<CircleIcon sx={{ backgroundColor: "#45910f" }} />}
            label="clear"
          >
          </Chip>
        </Stack>
      )}
      {!returned && (
        <Stack direction="row" spacing={1}>
          <Chip
            sx={{ backgroundColor: "#cf232369" }}
            // icon={<CircleIcon sx={{ backgroundColor: "#910f0f" }} />}
            label="not clear"
          >
          </Chip>

        </Stack>
      )}
    </>
  );
};

export default Status;
