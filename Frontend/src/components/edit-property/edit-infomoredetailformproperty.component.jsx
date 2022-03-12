import Grid from "@mui/material/Grid";

import React from "react";
import SimpleMDEReact from "react-simplemde-editor";
import { useTranslation } from "react-i18next";
import "./styles.css";
export default function EditinformationdetailsForm(props) {
  const { t } = useTranslation();
  const { formValues, setFormValues } = props;

  const handleDetailChange = (value) => {
    setFormValues({ ...formValues, detail: value });
  };

  return (
    <React.Fragment>
      <Grid item xs={12} container spacing={4}>
        <Grid item xs={12} sm={12}>
          <div className="App">
            <SimpleMDEReact
              id="detail"
              onChange={handleDetailChange}
              value={formValues.detail}
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
