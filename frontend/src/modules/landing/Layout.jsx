import React from "react";
import { Box, Container, Toolbar } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
     
        <Container maxWidth="lg" sx={{ mt:5 }}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
