import React from "react";
import { Box, Container, Toolbar } from "@mui/material";
const path = "../../images/baseImg.jpg";
const Layout = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 10 }}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
