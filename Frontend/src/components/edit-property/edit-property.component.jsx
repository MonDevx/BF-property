import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import React from "react";
import { useAlert } from "react-alert";
import { firestore } from "../../firebase/firebase.utils";
import EditinformationfacilityForm from "./edit-infofacilityformproperty.component.jsx";
import EditinformationForm from "./edit-infoformproperty.component.jsx";
import EditinformationdetailsForm from "./edit-infomoredetailformproperty.component.jsx";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import Linkmu from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import EditinformationaddressForm from "./edit-infoaddressformproperty.component.jsx";
import { AiOutlineHome, AiOutlineEdit } from "react-icons/ai";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(4),
    },
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));
export default function Editproperty(props) {
  const classes = useStyles();
  const [formValues, setFormValues] = React.useState({ ...props.property });
  const alert = useAlert();
  const [disable, setDisable] = React.useState(true);

  const { t } = useTranslation();

  const onupdate = () => {
    try {
      firestore
        .collection("property")
        .doc(props.id)
        .update(formValues)
        .then(() => {
          alert.success(t("alertupdatepropertysuccess.label"));
          setDisable(true);
        });
    } catch (err) {
      alert.error(t("alertupdatepropertyerror.label"));
    }
  };
  React.useEffect(() => {
    setFormValues(props.property);
    setDisable(false);
  }, [props.property]);
  return (
    <Container>
      <Paper className={classes.paper} elevation={3}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Linkmu color="inherit" component={Link} to="/my-property" className={classes.link}>
              <AiOutlineHome className={classes.icon} />
              {t("myproperty.name.label")}
            </Linkmu>
            <Typography color="textPrimary" className={classes.link}>
              <AiOutlineEdit className={classes.icon} />
              {"แก้ไขรายละเอียดข้อมูล"}
            </Typography>
          </Breadcrumbs>
        </Grid>
        {/* TODO  FUNCTION UPDATE IMAGE  */}
        {/* TODO  FUNCTION UPDATE FIRST SHOW IMAGE  */}
        {/* <Grid item xs={3}>
          <Button
            startIcon={<ImageIcon />}
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#ff9700" }}
          >
            {t("propertyeditpicture.label")}
          </Button>
        </Grid> */}
        <EditinformationForm
          formValues={formValues}
          setFormValues={setFormValues}
        />
        <EditinformationfacilityForm
          formValues={formValues}
          setFormValues={setFormValues}
        />
        
        <EditinformationaddressForm
          formValues={formValues}
          setFormValues={setFormValues}
        />

        <EditinformationdetailsForm
          formValues={formValues}
          setFormValues={setFormValues}
        />
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={onupdate}
              startIcon={<SystemUpdateAltIcon />}
              disabled={disable}
            >
              {t("propertysavebutton.label")}
            </Button>
          </div>
        </Grid>
      </Paper>
    </Container>
  );
}
