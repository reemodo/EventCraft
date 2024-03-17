import React from "react";
import { Box, Container, Toolbar } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt:10
        }}
      >
     
        <Container maxWidth="lg" sx={{ mt:5, minWidth:' -webkit-fill-available' }}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
