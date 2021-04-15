import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import SimpleMDEReact from "react-simplemde-editor";
import { useTranslation } from "react-i18next";
import './styles.css'
const useStyles = makeStyles((theme) => ({
  howtoContent: {
    margin: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  },
}));

export default function EditinformationdetailsForm(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { formValues, setFormValues } = props;

  const handleDetailChange = (value) => {
    setFormValues({ ...formValues, detail: value });
  };

  return (
    <React.Fragment>
      <Grid item xs={12} container spacing={4} className={classes.howtoContent}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t("propertymoredetail.label")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div
           className="App"
          >
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
