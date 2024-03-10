import React from "react";
import { Box, Container, Toolbar } from "@mui/material";

const Landing = ({ children }) => {
  return (
    <>
      {/* <Box
    component="mainContainer"
    sx={{
      flexDirection: 'row',
      width: '-webkit-fill-available',
      overflow: 'auto',
      marginTop: '67px'
    }}
  > */}
      <Box
        component="main"
        sx={{
          width: "-webkit-fill-available",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          // height: "100vh",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Landing;
