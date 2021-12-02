import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles,withStyles } from "@material-ui/core/styles";
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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);
const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: ["Noto Sans Thai", "Noto Sans"].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
const useStyles = makeStyles((theme) => ({

  padding: {
    padding: theme.spacing(3),
  },
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
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Grid item xs={12} container alignItems="center" spacing={2} className={classes.content}>
        {children}
      </Grid>
    </div>
  );
}
export default function Editproperty(props) {
  const classes = useStyles();
  const [formValues, setFormValues] = React.useState({ ...props.property });
  const alert = useAlert();
  const [disable, setDisable] = React.useState(true);

  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
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
            <Linkmu
              color="inherit"
              component={Link}
              to="/my-property"
              className={classes.link}
            >
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
        <Box sx={{ width: "100%" }}>
          <div className={classes.Tab}>
            <AntTabs
              value={value}
              onChange={handleChangeTab}
              aria-label="ant example"
              scrollButtons="auto"
              variant="scrollable"
            >
              <AntTab
                label={t("propertyheader.label")}
                {...a11yProps(0)}
              ></AntTab>
              <AntTab label={t("facility.label")} {...a11yProps(1)}></AntTab>
              <AntTab
                label={t("addressfromheader.label")}
                {...a11yProps(2)}
              ></AntTab>
              <AntTab
                label={t("propertymoredetail.label")}
                {...a11yProps(3)}
              ></AntTab>
              <AntTab label={t("uploadfile.label")} {...a11yProps(4)} disabled></AntTab>
            </AntTabs>
            <Typography className={classes.padding} />
          </div>
        </Box>
        <TabPanel value={value} index={0}>
          <EditinformationForm
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditinformationfacilityForm
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EditinformationaddressForm
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <EditinformationdetailsForm
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </TabPanel>

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
