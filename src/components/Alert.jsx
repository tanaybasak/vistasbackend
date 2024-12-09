import React from "react";
import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

const AlertComponent = ({ message, severity, open, onClose, autoHideDuration = 6000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

AlertComponent.propTypes = {
    message: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number

}

export default AlertComponent;
