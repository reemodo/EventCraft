import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({
  color = "secondary",
  open,
  handleClose,
  message,
  severity,
  ...rest
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      {...rest}
    >
      <MuiAlert
        color={color}
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
