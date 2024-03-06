import React from "react";
import { CardEdit } from "../events/card/components/CardEdit/CardEdit";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box flex={1}>
      <CardEdit />
    </Box>
  );
};

export default Home;
