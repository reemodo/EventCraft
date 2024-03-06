import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { LoginForm } from "../LoginForm/LoginForm";

export const LoginFormModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <LoginForm onClose={onClose} isModal />
      </DialogContent>
    </Dialog>
  );
};
