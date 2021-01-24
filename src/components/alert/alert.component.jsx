import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
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
