import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { connect } from "react-redux";
import {
  firestorage,
  firestorage2,
  firestore,
} from "../../firebase/firebase.utils";
import SimpleMap from "../map/map.component.jsx";
import { useTranslation } from "react-i18next";
import {
  ChipFileImage,
  ChipNearbyPlaces,
  ChipCentralServiceAndFurniture,
} from "../customs/chip-customs/chip-customs.jsx";
import { useAlert } from "react-alert";
const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
function currencyFormat(num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function Checkinformation(props) {
  const classes = useStyles();
  const alert = useAlert();
  const { formValues, activeStep, handleBack, handleNext } = props;
  const [loading, setLoading] = React.useState(false);
  var Urlimginside = [];
  var Urlimgoutside = [];
  var firstimg;
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const { t } = useTranslation();
  const Uploadimg = () => {
    const promises = [];
    try {
      setLoading(true);
      props.filesinside.forEach((file) => {
        const uploadTask = firestorage
          .ref()
          .child(`img/inside/${file.name}`)
          .put(file);
        promises.push(uploadTask);
        uploadTask.on(
          firestorage2.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (snapshot.state === firestorage2.TaskState.RUNNING) {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => alert.error(error.code),
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

            var objimginside = {};
            objimginside["original"] = downloadURL;
            objimginside["thumbnail"] = downloadURL;
            Urlimginside.push(objimginside);
          }
        );
      });

      props.filesoutside.forEach((file) => {
        const uploadTask = firestorage
          .ref()
          .child(`img/outside/${file.name}`)
          .put(file);
        promises.push(uploadTask);
        uploadTask.on(
          firestorage2.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (snapshot.state === firestorage2.TaskState.RUNNING) {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => alert.error(error.code),
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

            var objimgoutside = {};

            objimgoutside["original"] = downloadURL;
            objimgoutside["thumbnail"] = downloadURL;
            Urlimgoutside.push(objimgoutside);
            firstimg = downloadURL;
          }
        );
      });
      Promise.all(promises)
        .then(
          () =>
            (timer.current = setTimeout(() => {
              Uploadinformation();
              setLoading(false);
              handleNext();
            }, 5000))
        )
        .catch((error) => alert.error(error.code));
    } catch (error) {
      alert.error(error.message);
    }
  };
  const Uploadinformation = () => {
    const createdAt = new Date();
    if (props.idtype === 3) {
      firestore.collection("house").add({
        idtype: props.idtype,
        name: props.name.replace("/"," "),
        urlimginside: Urlimginside,
        urlimgoutside: Urlimgoutside,
        firstimg: firstimg,
        sizefamily: props.sizefamily,
        detail: props.detail,
        latitude: props.latitude,
        longitude: props.longitude,
        Numberofbedrooms: props.Numberofbedrooms,
        Numberofbathrooms: props.Numberofbathrooms,
        Yearofconstruction: props.Yearofconstruction.getFullYear(),
        Numberofparkingspace: props.Numberofparkingspace,
        Numberoffloors: props.Numberoffloors,
        price: props.price,
        Housesize: props.Housesize,
        email: props.currentUser.email,
        idowner: props.currentUser.id,
        province: props.province,
        District: props.District,
        projectname: props.projectname,
        building: props.building,
        subDistrict: props.subDistrict,
        zipCode: props.zipCode,
        Landmark: props.Landmark,
        Address: props.Address,
        furniture: props.furniture,
        centralservice: props.centralservice,
        Nearbyplaces: props.Nearbyplaces,
        CreateAt: createdAt,
      });
    } else {
      firestore.collection("house").add({
        idtype: props.idtype,
        name: props.name,
        urlimginside: Urlimginside,
        urlimgoutside: Urlimgoutside,
        firstimg: firstimg,
        sizefamily: props.sizefamily,
        detail: props.detail,
        latitude: props.latitude,
        longitude: props.longitude,
        Numberofbedrooms: props.Numberofbedrooms,
        Numberofbathrooms: props.Numberofbathrooms,
        Yearofconstruction: props.Yearofconstruction.getFullYear(),
        Numberofparkingspace: props.Numberofparkingspace,
        Numberoffloors: props.Numberoffloors,
        price: props.price,
        Housesize: props.Housesize,
        email: props.currentUser.email,
        idowner: props.currentUser.id,
        province: props.province,
        District: props.District,
        subDistrict: props.subDistrict,
        zipCode: props.zipCode,
        Landmark: props.Landmark,
        Address: props.Address,
        furniture: props.furniture,
        centralservice: props.centralservice,
        Nearbyplaces: props.Nearbyplaces,
        CreateAt: createdAt,
      });
    }

    setLoading(false);
    handleNext();
  };
  const handleButtonClick = async (e) => {
    e.preventDefault();
    Uploadimg();
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {t("checkhouseinfoheader.label")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>
            {t("typehouse.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.idtype === 0
              ? t("typehouse1.label")
              : props.idtype === 2
              ? t("typehouse2.label")
              : t("typehouse3.label")}
          </Typography>
        </Grid>
        {props.idtype === 3 ? (
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              {t("projectname.label")}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.projectname} {t("building.label")} {props.building}
            </Typography>
          </Grid>
        ) : (
          ""
        )}

        <Grid item xs={3}>
          <Typography variant="subtitle1" gutterBottom>
            {t("myhouse.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertydetail.label")}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertysizefamily.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.sizefamily === 1
              ? t("propertysizefamilytype1.label")
              : props.sizefamily === 2
              ? t("propertysizefamilytype2.label")
              : t("propertysizefamilytype3.label")}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertybed.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.Numberofbedrooms}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertybath.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.Numberofbathrooms}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertyyear.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.Yearofconstruction.getFullYear()}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertycar.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.Numberofparkingspace}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertyfloors.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.Numberoffloors}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertyprice.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {currencyFormat(props.price)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {props.idtype !== 3
              ? t("propertysize.label")
              : t("propertysizecondo.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.Housesize}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {props.idtype !== 3
              ? t("propertysizeprice.label")
              : t("propertysizepricecondo.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {currencyFormat(props.price / props.Housesize)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t("facilityformheader.label")}
          </Typography>{" "}
          <Typography variant="subtitle2" gutterBottom>
            {t("facilityformtopic1.label")}
          </Typography>
          {props.furniture && (
            <ChipCentralServiceAndFurniture listItems={props.furniture} />
          )}
          <Typography variant="subtitle2" gutterBottom>
            {t("facilityformtopic2.label")}
          </Typography>
          {props.centralservice && (
            <ChipCentralServiceAndFurniture listItems={props.centralservice} />
          )}
        </Grid>
        <Grid item sm={12}>
          <Typography variant="subtitle2" color="secondary" gutterBottom>
            {t("imghepl.label")}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {t("imgoutside.label")}
          </Typography>
          <ChipFileImage files={props.filesoutside} />
        </Grid>
        <Grid item sm={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t("imginside.label")}
          </Typography>
          <ChipFileImage files={props.filesinside} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t("local.label")}
          </Typography>

          <SimpleMap
            lat={props.latitude}
            lng={props.longitude}
            draggable={false}
          />
        </Grid>
        <Grid item sm={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t("nearbyplaces.label")}
          </Typography>
          <ChipNearbyPlaces Nearbyplaces={props.Nearbyplaces} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t("local2.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.Address}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" gutterBottom>
            {t("provice.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.province}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" gutterBottom>
            {t("distance.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.District}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" gutterBottom>
            {t("subdistance.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.subDistrict}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" gutterBottom>
            {t("addressfrompost.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.zipCode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t("addressfromLandmark.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.Landmark}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t("propertymoredetail.label")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.detail}
          </Typography>
        </Grid>
      </Grid>

      <div className={classes.buttons}>
        {activeStep !== 0 && (
          <Button
            onClick={() => handleBack(formValues)}
            className={classes.button}
          >
            {t("back.label")}
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
          className={classes.button}
          disabled={loading}
        >
          {t("checkinfo.label")}
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Checkinformation);
