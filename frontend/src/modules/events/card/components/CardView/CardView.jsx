import React, { forwardRef } from "react";

import { CardListItem } from "../CardListItem/CardListItem";

import { Box } from "@mui/material";

export const CardView = forwardRef(({ title, item, model, bgItem, bgUrl }, ref) => {
  const list = !!model
    ? model.cardItems
    : [
        {
          ...item[0],
          text: title[0],
        },
        {
          ...item[1],
          text: title[1],
        }
      ];

    const listWithBgImag =
      !model && bgUrl ? [...list, { ...bgItem, src: bgUrl }] : list;

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
          {listWithBgImag.map((item, idx) => (
            <CardListItem
              item={{
                ...item,
              }}
              key={item._id || idx}
            />
          ))}
        </Box>
      </Box>
    );
  }
);
