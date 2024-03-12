import React, { forwardRef } from "react";

import { CardListItem } from "../CardListItem/CardListItem";
import { ItemTypes } from "../CardEdit/CardEdit";
import { Box } from "@mui/material";

export const CardView = forwardRef(({ title }, ref) => {
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
            id: "1",
            type: ItemTypes.TEXT,
            left: 0,
            top: 0,
            position: "absolute",
            text: title,
            fontSize: 50,
            decoration: "",
            style: "",
            color: "",
          }}
        />
      </Box>
    </Box>
  );
});
