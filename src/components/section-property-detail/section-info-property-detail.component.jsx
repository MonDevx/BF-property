/* eslint-disable no-lone-blocks */
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BathtubTwoToneIcon from "@material-ui/icons/BathtubTwoTone";
import Crop32TwoToneIcon from "@material-ui/icons/Crop32TwoTone";
import FormatListNumberedRtlTwoToneIcon from "@material-ui/icons/FormatListNumberedRtlTwoTone";
import GroupIcon from "@material-ui/icons/Group";
import LocalParkingTwoToneIcon from "@material-ui/icons/LocalParkingTwoTone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MapIcon from "@material-ui/icons/Map";
import QueryBuilderTwoToneIcon from "@material-ui/icons/QueryBuilderTwoTone";
import SendIcon from "@material-ui/icons/Send";
import SingleBedTwoToneIcon from "@material-ui/icons/SingleBedTwoTone";
import SquareFootTwoToneIcon from "@material-ui/icons/SquareFootTwoTone";
import axios from "axios";
import React from "react";
import { useAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import SimpleMap from "../map/map.component.jsx";
import { useTranslation } from "react-i18next";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Card from "@material-ui/core/Card";
import NumberFormat from "react-number-format";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import {
  ChipNearbyPlaces,
  ChipCentralServiceAndFurniture,
} from "../customs/chip-customs/chip-customs.jsx";
import Paper from "@material-ui/core/Paper";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  howtoContent: {
    backgroundColor: theme.palette.background.paper,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 35,
  },
  paper: {
    position: "sticky",
    top: 80,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  markedH4Center: {
    height: 1,
    width: "100%",
    display: "block",
    margin: `${theme.spacing(4)}px auto 0`,
    backgroundColor: "#f6f6f6",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  bold: {
    fontWeight: 600
  }
}));

function currencyFormat(num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

export default function Info(props) {
  const [displayname, setdisplay] = React.useState("");
  const [email, setemail] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [disable, setdisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const alert = useAlert();
  const mapRef = React.useRef(null);
  const classes = useStyles();
  const { t } = useTranslation();
  const [year, setyear] = React.useState(30);
  const [interest, setinterest] = React.useState(5.25);
  const [pricedeposit, setpricedeposit] = React.useState(props.price);
  const [priceloan, setpriceloan] = React.useState(props.price * (85 / 100));
  const [pricemonth, setpricemonth] = React.useState(0);

  const deposithandleChange = (event) => {
    setpricedeposit(event.target.value);
    setpriceloan(event.target.value * (85 / 100));
  };
  const loanhandleChange = (event) => {
    setpriceloan(event.target.value * 1);
  };
  const yearhandleChange = (event, newValue) => {
    if (event.target.value !== undefined) {
      setyear(event.target.value);
    } else {
      setyear(newValue);
    }
  };
  const interesthandleChange = (event, newValue) => {
    if (event.target.value !== undefined) {
      setinterest(event.target.value);
    } else {
      setinterest(newValue);
    }
  };

  const PMT = (type, fv) => {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;
    var ir = (interest * 0.01) / 12;
    var np = year * 12;
    var pv = priceloan;
    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0) return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = (-ir * pv * (pvif + fv)) / (pvif - 1);

    if (type === 1) pmt /= 1 + ir;

    return Math.abs(pmt);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setpricemonth(PMT());
  });

  const handleSubmit = (event) => {
    setdisable(true);
    setLoading(true);
    event.preventDefault();
    axios({
      method: "POST",
      url: "https://us-central1-bfproperty.cloudfunctions.net/sendMailOverHTTP",
      data: {
        name: displayname,
        email: email,
        phone: phone,
        propertyname: props.name,
        emailowner: props.emailowner,
      },
    }).then((response) => {
      if (response.data === "success") {
        alert.success(t("contactsuccess.label"));
        setLoading(false);
      } else if (response.data === "fail") {
        alert.error(t("contactfail.label"));
      }
    });
  };
  {
    /* TODO  CLEAN CODE  */
  }
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container xs={12} spacing={2}>

          <Grid container xs={isMobile ? 12 : 9}>

            <Grid item xs={12}>
              <Typography variant="h5">
                {props.typehouse !== 3
                  ? t("propertydetail.label")
                  : "รายละเอียดคอนโด"}
              </Typography>
              <IconButton
                onClick={() =>
                  mapRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                aria-label="add an alarm"
              >
                <MapIcon />
              </IconButton>
            </Grid>
            <Grid item xs={isMobile ? 4 : 3}>
              <GroupIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {t("propertysizefamily.label")}
              </Typography>
              <Typography variant="subtitle1">
                {props.sizefamily === 1
                  ? t("propertysizefamilytype1.label")
                  : props.sizefamily === 2
                  ? t("propertysizefamilytype2.label")
                  : t("propertysizefamilytype3.label")}
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 4 : 3}>
              <SingleBedTwoToneIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {t("propertybed.label")}
              </Typography>
              <Typography variant="subtitle1">
                {props.Numberofbedrooms}
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 4 : 3}>
              <BathtubTwoToneIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {t("propertybath.label")}
              </Typography>
              <Typography variant="subtitle1">
                {props.Numberofbathrooms}
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 4 : 3}>
              <QueryBuilderTwoToneIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {t("propertyyear.label")}
              </Typography>
              <Typography variant="subtitle1">
                {props.Yearofconstruction}
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 4 : 3}>
              <LocalParkingTwoToneIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {t("propertycar.label")}
              </Typography>
              <Typography variant="subtitle1">
                {props.Numberofparkingspace}
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 4 : 3}>
              <FormatListNumberedRtlTwoToneIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {t("propertyfloors.label")}
              </Typography>
              <Typography variant="subtitle1">
                {props.Numberoffloors}
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 4 : 3}>
              <SquareFootTwoToneIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {props.typehouse !== 3
                  ? t("propertysizeprice.label")
                  : t("propertysizepricecondo.label")}
              </Typography>
              <Typography variant="subtitle1">
                {currencyFormat(props.pricesize)}
                {t("bath.label")}
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 4 : 3}>
              <Crop32TwoToneIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {props.typehouse !== 3
                  ? t("propertysize.label")
                  : t("propertysizecondo.label")}
              </Typography>
              <Typography variant="subtitle1">{props.Housesize}</Typography>
            </Grid>
            {props.typehouse === 3 ? (
              <React.Fragment>
                <Grid item xs={isMobile ? 4 : 3}>
                  <EmojiTransportationIcon className={classes.icon} />
                  <Typography variant="subtitle1">
                    {t("building.label")}
                  </Typography>
                  <Typography variant="subtitle1">{props.building}</Typography>
                </Grid>
                <Grid item xs={isMobile ? 4 : 3}>
                  <EmojiTransportationIcon className={classes.icon} />
                  <Typography variant="subtitle1">
                    {t("projectname.label")}
                  </Typography>
                  <Typography variant="subtitle1">
                    {props.projectname}
                  </Typography>
                </Grid>
              </React.Fragment>
            ) : (
              ""
            )}
          </Grid>

          <Paper className={classes.paper}>
            <ValidatorForm
              onSubmit={handleSubmit}
              onError={() => alert.error(t("updateinfoerror2.label"))}
            >
              <Grid item xs={12}>
                <Typography variant="h5">{t("contact.label")}</Typography>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "5%" }}>
                <TextValidator
                  label={t("displayname.label")}
                  onChange={(event) => setdisplay(event.target.value)}
                  name="displayname"
                  value={displayname}
                  variant="outlined"
                  fullWidth
                  validators={["required"]}
                  errorMessages={[t("displaynamerequired.label")]}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "5%" }}>
                <TextValidator
                  label={t("email.label")}
                  onChange={(event) => setemail(event.target.value)}
                  name="email"
                  value={email}
                  variant="outlined"
                  fullWidth
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("emailrequired.label"),
                    t("emailisEmail.label"),
                  ]}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "5%" }}>
                <TextValidator
                  label={t("phone.label")}
                  onChange={(event) => setphone(event.target.value)}
                  name="phone"
                  value={phone}
                  variant="outlined"
                  fullWidth
                  validators={["required"]}
                  errorMessages={[t("phonerequired.label")]}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "5%" }}>
                <div className={classes.wrapper}>
                  <Button
                    startIcon={<SendIcon />}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={disable}
                  >
                    {t("buttonsubmitcontact.label")}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
            </ValidatorForm>
          </Paper>

          <div className={classes.markedH4Center} />
          <Grid item xs={12}>
            <Typography variant="h5"> {t("facility.label")}</Typography>
            <Typography variant="subtitle1">
              {t("facilityformtopic1.label")}
            </Typography>
            <ChipCentralServiceAndFurniture listItems={props.furniture} />
            <Typography variant="subtitle1">
              {t("facilityformtopic2.label")}
            </Typography>
            <ChipCentralServiceAndFurniture listItems={props.centralservice} />
          </Grid>
          <div className={classes.markedH4Center} />
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("propertymoredetail.label")}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">{props.detail}</Typography>
          </Grid>
          <div className={classes.markedH4Center} />
          <Grid item xs={12}>
            <Typography variant="h5">{t("addressfromdetail.label")}</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">
              {props.Address + " "}
              {props.District + " "}
              {props.subDistrict + " "}
              {props.province + " "}
              {props.zipCode + " "}
            </Typography>
          </Grid>
          <div className={classes.markedH4Center} />
          <Grid item xs={12}>
            <Typography variant="h5">
              <LocationOnIcon fontSize="large" />
              {t("local.label")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {t("addressfromLandmark.label")}
            </Typography>
            <Typography variant="subtitle2">{props.Landmark}</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">
              {t("nearbyplaces.label")}
            </Typography>
            <ChipNearbyPlaces Nearbyplaces={props.Nearbyplaces} />
            <ChipNearbyPlaces
              Nearbyplaces={props.Nearbyplacesapi}
              latitude={props.latitude}
              longitude={props.longitude}
            />
          </Grid>
        </Grid>
      </Container>
      <Grid item xs={12}>
        <div ref={mapRef} />
        <SimpleMap
          lat={props.latitude}
          lng={props.longitude}
          draggable={false}
        />
      </Grid>
      <Container maxWidth="md" style={{ marginBottom: "2.5%" }}>
        <Card>
          <Grid container xs={12} spacing={2} style={{ margin: "2.5%" }}>
            <Grid item xs={12}>
              <Typography variant="h5">
                <AccountBalanceIcon
                  fontSize="large"
                  style={{ marginRight: "1%" }}
                />
                {t("calculateloanheader.label")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("calculateloansubheader.label")}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={t("deposit.label")}
                value={pricedeposit}
                onChange={deposithandleChange}
                name="price"
                variant="filled"
                id="formatted-numberformat-input1"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label={t("loan.label")}
                value={priceloan}
                onChange={loanhandleChange}
                name="price"
                variant="filled"
                id="formatted-numberformat-input2"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2">
                {t("paymentamount/month.label")}
              </Typography>
              <Typography variant="subtitle1" style={{ color: "#26ae61" }} className={classes.bold}>
                {currencyFormat(pricemonth)} {t("bath.label")}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="filled-basic1"
                size="small"
                label={t("interestrate.label")}
                helperText={t("interestrateinputhelp.label")}
                variant="filled"
                value={interest}
                onChange={interesthandleChange}
              />
              <Slider
                value={interest}
                onChange={interesthandleChange}
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider"
                step={0.01}
                max={15}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="filled-basic2"
                size="small"
                label={t("installmentperiod.label")}
                variant="filled"
                helperText={t("installmentperiodhelp.label")}
                value={year}
                onChange={yearhandleChange}
              />
              <Slider
                value={year}
                onChange={yearhandleChange}
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider"
                max={30}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2">
                {t("principalpayment.label")}
              </Typography>
              <Typography variant="subtitle1" color="success" className={classes.bold}>
                {currencyFormat(
                  PMT() - (priceloan * (interest * 0.01) * 30) / 365
                )}
                {t("bath.label")}
              </Typography>

              <Typography variant="subtitle2">
                {t("interestpayment.label")}
              </Typography>
              <Typography variant="subtitle1" color="secondary" className={classes.bold}>
                {currencyFormat((priceloan * (interest * 0.01) * 30) / 365)}{" "}
                {t("bath.label")}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
