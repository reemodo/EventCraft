import React from "react";

import { Box, Dialog, DialogContent, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

import { useAuthHelpers } from "../../hooks/useAuthHelpers/useAuthHelpers";

export const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState("login");

  const { login, register, pendingLogin, pendingRegister } = useAuthHelpers();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onLogin = async (data) => {
    await login(data);
    onClose();
  };

  const onRegister = async (data) => {
    await register(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Login" value="login" />
              <Tab color="red" label="Register" value="register" />
            </TabList>
          </Box>

          {/* Login */}
          <TabPanel value="login" sx={{ height: "100%" }}>
            <LoginForm
              isModal
              onClose={onClose}
              onLogin={onLogin}
              loading={pendingLogin}
            />
          </TabPanel>

          {/* Register */}
          <TabPanel value="register">
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              <RegisterForm
                isModal
                onClose={onClose}
                onRegister={onRegister}
                loading={pendingRegister}
              />
            </Stack>
          </TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog>
  );
};
