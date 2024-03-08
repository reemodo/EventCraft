import React from "react";

import { Box, Dialog, DialogContent, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { useLoginMutation, useRegisterMutation } from "../../api/auth.api";

import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { useAddEventMutation } from "../../../events/api/events.api";
export const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState("login");

  const { login, isLoading: pendingLogin } = useLoginMutation();
  const { register, isLoading: pendingRegister } = useRegisterMutation();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onLogin = (data) => {
    const userData = login(data);
  };

  const onRegister = (data) => {
    const userData = register(data);
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
