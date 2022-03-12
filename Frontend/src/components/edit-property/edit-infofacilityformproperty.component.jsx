import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(2),
  },
}));
function EditinformationfacilityForm(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { formValues, setFormValues } = props;
  /* TODO  FIX LIST ITEM TO SUPPORT MULTIPLE LANGUAGES  */
  const checkboxhandleChange = (event) => {
    setFormValues({
      ...formValues,
      furniture: formValues.furniture.map((item) =>
        item.name === event.target.name
          ? { ...item, checked: event.target.checked }
          : item
      ),
    });
  };

  const checkbox2handleChange = (event) => {
    setFormValues({
      ...formValues,
      centralservice: formValues.centralservice.map((item) =>
        item.name === event.target.name
          ? { ...item, checked: event.target.checked }
          : item
      ),
    });
  };
  var listItems2 = [];
  if (formValues.centralservice) {
    listItems2 = formValues.centralservice.map((item) => (
      <React.Fragment>
        <FormControlLabel
          control={
            <Checkbox
              label={item.name}
              onChange={checkbox2handleChange}
              checked={item.checked}
              name={item.name}
              color="primary"
            />
          }
          label={item.name}
        />
      </React.Fragment>
    ));
  }
  var listItems = [];
  if (formValues.furniture) {
    listItems = formValues.furniture.map((item) => (
      <React.Fragment>
        <FormControlLabel
          control={
            <Checkbox
              label={item.name}
              onChange={checkboxhandleChange}
              checked={item.checked}
              name={item.name}
              color="primary"
            />
          }
          label={item.name}
        />
      </React.Fragment>
    ));
  }

  return (
    <React.Fragment>
      <Grid item xs={12} container spacing={4} >
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {t("facilityformtopic1.label")}
          </Typography>
          {listItems}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {t("facilityformtopic2.label")}
          </Typography>
          {listItems2}
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
export default EditinformationfacilityForm;
