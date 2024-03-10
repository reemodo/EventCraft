import { Box } from "@mui/material";
import React from "react";

export const Shape = ({ item }) => {
  return (
    <Box sx={{ width: `${+item.width}px`, height: `${+item.height}px` }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={"100%"}
        height={"100%"}
        style={{
          fill: "currentColor",
          color: item.color || "gray",
        }}
      >
        {/* <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v6h-2zm0 4h2v2h-2z" /> */}
        {/* <path d="m 20 0 L 50 50 l -50 0 l 20 -50" /> */}

        <path d={item.d} />
        {/* <rect x="10%" y="10%" width="80%" height="80%" /> */}
      </svg>
    </Box>
  );
};
