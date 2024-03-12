import React from "react";
import { Box, Container, Toolbar } from "@mui/material";
const path = '../../images/baseImg.jpg'
const Layout = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          width: "-webkit-fill-available",
          flexGrow: 1,
          backgroundImage: `url(${path})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
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

export default Layout;
