import React from "react";
import { Box, Container, Toolbar, styled , InputBase} from "@mui/material";
const AppBar =  styled(InputBase)(({ theme }) => ({
  pl:0,
  pr:0
}));
const Layout = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        pl={0}
        pr={0}
        sx={{
          flexGrow: 1,
        }}
      >
        <Container
          paddingLeft="0px"
          pr={0}
          maxWidth="lg"
          sx={{ mt: 5, minWidth: " -webkit-fill-available" }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
