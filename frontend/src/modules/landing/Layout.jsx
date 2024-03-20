import React from "react";
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
const Layout = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <StyledContainer
          paddingLeft="0px"
          pr="0px"
          maxWidth="lg"
          sx={{ mt: "66px", minWidth: " -webkit-fill-available" }}
        >
          {children}
        </StyledContainer>
      </Box>
    </>
  );
};

export default Layout;
