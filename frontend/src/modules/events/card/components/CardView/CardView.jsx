import React, { forwardRef } from "react";

import { CardListItem } from "../CardListItem/CardListItem";

import { Box } from "@mui/material";
import { ItemTypes } from "../CardEdit/CardEdit";

export const CardView = forwardRef(({ title, item, model, bgUrl }, ref) => {
  const list = !!model
    ? model.cardItems
    : [
        {
          ...item,
          text: title,
        },
        {
          type: bgUrl ? ItemTypes.IMAGE : "",
          width: "100%",
          height: "100%",
          src: bgUrl,
          top: 0,
          left: 0,
        },
      ];

  return (
    <Box
      sx={{
        position: "relative",
        width: "500px",
        height: "300px",
        backgroundColor: "white",
        mt: 2,
      }}
      overflow={"hidden"}
      ref={ref}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        {list.map((item) => (
          <CardListItem
            item={{
              ...item,
            }}
            key={item._id}
          />
        ))}
      </Box>
    </Box>
  );
});
