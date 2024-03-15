import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
export function TopContainer({handelSearch}) {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          height: "50vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          sx={{
            textAlign: "center",
            flexGrow: 1,
            height: "30vh",
            backgroundColor: "#d5eed6",
            paddingTop: "15%",
          }}
        >
          Mange your events with EventCraft
        </Typography>
        <SearchBar handelSearch={handelSearch}/>
      </Box>
    </>
  );
}
