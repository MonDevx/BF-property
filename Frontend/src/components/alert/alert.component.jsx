import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import React from "react";

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert variant="filled" severity={options.type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertTemplate;
