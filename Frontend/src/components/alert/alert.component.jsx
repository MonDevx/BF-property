import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import React from "react";
import AlertTitle from '@mui/material/AlertTitle';
const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={options.type}>
      <AlertTitle style={{ 'fontWeight': 'bold' }} >{options.type}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertTemplate;
