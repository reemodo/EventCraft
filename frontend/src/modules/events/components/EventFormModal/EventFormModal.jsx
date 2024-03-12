import React, { useRef, useState } from "react";

import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";

import { EventForm } from "../EventForm/EventForm";
import { CardView } from "../../card/components/CardView/CardView";
import { exportAsImage } from "../../../shared/utils";

export const EventFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  setEventsList,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Event</DialogTitle>

      <DialogContent>
        <EventForm
          onClose={onClose}
          isModal={true}
          isAddFlow
          onSuccess={onSubmit}
          setEventsList={setEventsList}
        />
      </DialogContent>
    </Dialog>
  );
};
