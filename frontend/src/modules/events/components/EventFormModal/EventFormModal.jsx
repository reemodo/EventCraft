import React from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { EventForm } from "../EventForm/EventForm";

export const EventFormModal = ({ isOpen, onClose, onSubmit, onAddEvent }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Event</DialogTitle>

      <DialogContent>
        <EventForm
          onClose={onClose}
          isModal={true}
          isAddFlow
          onSuccess={onSubmit}
          onAddEvent={onAddEvent}
        />
      </DialogContent>
    </Dialog>
  );
};
