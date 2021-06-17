import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  howtoContent: {
    margin: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  },
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
      <Grid item xs={12} container spacing={4} className={classes.howtoContent}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t("facilityformheader.label")}
          </Typography>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              {t("facilityformtopic1.label")}
            </Typography>
          </Grid>
          {listItems}

          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" gutterBottom>
              {t("facilityformtopic2.label")}
            </Typography>
            {listItems2}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default EditinformationfacilityForm;
