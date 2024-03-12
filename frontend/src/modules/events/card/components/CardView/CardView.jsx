import React, { forwardRef } from "react";

import { CardListItem } from "../CardListItem/CardListItem";
import { ItemTypes } from "../CardEdit/CardEdit";
import { Box } from "@mui/material";

export const CardView = forwardRef(({ title, item }, ref) => {
  return (
    <Box ref={ref}>
      <Box
        sx={{
          position: "relative",
          width: "500px",
          height: "300px",
          border: "1px solid #000",
        }}
        overflow={"hidden"}
      >
        <CardListItem
          item={{
            ...item,
            text: title,
          }}
        />
      </Box>
    </Box>
  );
});
