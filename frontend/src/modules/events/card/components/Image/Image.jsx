import { Box } from "@mui/material";
import React from "react";

export const Image = ({ item }) => {
  return (
    <Box
      component={"img"}
      sx={{
        width: `${+item.width}px`,
        height: `${+item.height}px`,
        overflow: "hidden",
        borderRadius: `${+item.borderRadius}px`,
      }}
      src={item.src}
      alt="card image"
    />
  );
};
