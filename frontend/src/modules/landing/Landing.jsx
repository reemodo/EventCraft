import React from "react";
import { Box, Container, Toolbar } from "@mui/material";
const path = '../../images/baseImg.jpg'
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
          flexGrow: 1,
          backgroundImage: `url(${path})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
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
