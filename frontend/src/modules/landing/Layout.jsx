import React from "react";
<<<<<<< HEAD
import { Box, Container, Toolbar, styled , InputBase} from "@mui/material";

const AppBar =  styled(InputBase)(({ theme }) => ({
  pl:0,
  pr:0
}));
const StyledContainer = styled(Container)`
  && {
    padding-left: 0;
    padding-right: 0;
    /* Add any other styles as needed */
  }
`;
=======
import { Box, Container, Toolbar } from "@mui/material";

>>>>>>> parent of 9545101 (add)
const Layout = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "10vh",
        }}
      >
<<<<<<< HEAD
        <StyledContainer
          paddingLeft="0px"
          pr="0px"
=======
        <Container
>>>>>>> parent of 9545101 (add)
          maxWidth="lg"
          sx={{ mt: "60px", minWidth: " -webkit-fill-available" }}
        >
          {children}
        </StyledContainer>
      </Box>
    </>
  );
};

export default Layout;
