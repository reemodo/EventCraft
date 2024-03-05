import React from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { RegisterForm } from "../RegisterForm/RegisterForm";

export const RegisterFormModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <RegisterForm onClose={onClose} isModal />
      </DialogContent>
    </Dialog>
  );
};
