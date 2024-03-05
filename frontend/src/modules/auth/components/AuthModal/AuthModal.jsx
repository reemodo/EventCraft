import React from "react";

import { Box, Dialog, DialogContent, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState("login");

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Login" value="login" />
              <Tab label="Register" value="register" />
            </TabList>
          </Box>

          {/* Login */}
          <TabPanel value="login" sx={{ height: "100%" }}>
            <LoginForm isModal onClose={onClose} />
          </TabPanel>

          {/* Register */}
          <TabPanel value="register">
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              <RegisterForm isModal onClose={onClose} />
            </Stack>
          </TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog>
  );
};
