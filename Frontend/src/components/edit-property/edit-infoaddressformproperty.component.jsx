import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";

import SimpleMap from "../map/map.component.jsx";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const thai = require("thai-data");
const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  howtoContent: {
    margin: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  },
}));

export default function EditinformationaddressForm(props) {
  const { formValues, setFormValues } = props;
  const [zipCode, setZipCode] = React.useState("");
  const [subDistrict, setSubDistrict] = React.useState(Array);
  const [subDistrictSelect, setSubDistrictSelect] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [
    isDisabledSubDistrictSelect,
    setIsDisabledSubDistrictSelect,
  ] = React.useState(true);
  useEffect(() => {
    setZipCode(formValues.zipCode);
    onSetZipCode(formValues.zipCode);
    onSetDistrict(formValues.subDistrict);
    autoSuggestion(formValues.zipCode, formValues.subDistrict);
  }, [formValues.zipCode]);
  const onSetZipCode = (e) => {
    setSubDistrictSelect("");
    setDistrict("");
    setProvince("");
    if (/^\d{0,5}$/.test(e)) {
      setZipCode(e);
      if (thai.autoSuggestion(e).subDistrict) {
        setSubDistrict(thai.autoSuggestion(e).subDistrict);
        setIsDisabledSubDistrictSelect(false);
      } else {
        setIsDisabledSubDistrictSelect(true);
      }
    }
  };

  const autoSuggestion = (zipCode, subDistrict) => {
    setDistrict(thai.autoSuggestion(zipCode, subDistrict).districtName);
    setProvince(thai.autoSuggestion(zipCode, subDistrict).provinceName);
    setFormValues({
      ...formValues,
      zipCode: zipCode,
      subDistrict: subDistrict,
      District: thai.autoSuggestion(zipCode, subDistrict).districtName,
      province: thai.autoSuggestion(zipCode, subDistrict).provinceName,
    });
  };

  const onSetDistrict = (subDistrict) => {
    setSubDistrictSelect(subDistrict);
    autoSuggestion(zipCode, subDistrict);
  };
  const classes = useStyles();
  const [error, setError] = React.useState(Boolean);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "price" ||
      name === "propertysize" ||
      name === "Numberofbathrooms" ||
      name === "Numberoffloors" ||
      name === "Numberofparkingspace" ||
      name === "Numberofbedrooms"
    ) {
      setFormValues({ ...formValues, [name]: Number(value) });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleInputMap = (lat, lng) => {
    setFormValues({ ...formValues, latitude: lat, longitude: lng });
  };
  const handleerror = (event) => {
    const { value } = event.target;
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };
  const [inputNearbyplaces, setInputNearbyplaces] = React.useState(
    formValues.Nearbyplaces
  );
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputNearbyplaces];
    list[index][name] = value;
    setInputNearbyplaces(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputNearbyplaces];
    list.splice(index, 1);
    setInputNearbyplaces(list);
  };

  const handleAddClick = () => {
    setInputNearbyplaces([
      ...inputNearbyplaces,
      { LocationName: "", Distance: "" },
    ]);
  };

  const { t } = useTranslation();
  const items3 = [];
  if (inputNearbyplaces !== undefined || formValues.Nearbyplaces) {
    inputNearbyplaces.forEach((x, i) => {
      items3.push(
        <Grid item xs={4}>
          <TextField
            id="LocationName"
            label={t("locationnameinput.label")}
            name="LocationName"
            placeholder={t("locationnameinputplaceholder.label")}
            value={x.LocationName}
            onChange={(e) => handleInputChange(e, i)}
          />
          <TextField
            id="Distance"
            label={t("distanceinput.label")}
            name="Distance"
            placeholder={t("distanceinputplaceholder.label")}
            type="number"
            value={x.Distance}
            onChange={(e) => handleInputChange(e, i)}
          />

          {inputNearbyplaces.length !== 1 && (
            <IconButton
              aria-label="delete"
              onClick={() => handleRemoveClick(i)}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {inputNearbyplaces.length - 1 === i && (
            <IconButton aria-label="add" onClick={handleAddClick}>
              <AddCircleIcon />
            </IconButton>
          )}
        </Grid>
      );
    });
  }
   React.useEffect(() => {
    setFormValues({ ...formValues, Nearbyplaces: inputNearbyplaces });
  }, [inputNearbyplaces]);
  return (
    <React.Fragment>
      <Grid item xs={12} container spacing={4} className={classes.howtoContent}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t("addressfromheader.label")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <SimpleMap
            onChange={handleInputMap}
            lat={formValues.latitude}
            lng={formValues.longitude}
            draggable={true}
          />
        </Grid>
        <Grid item sm={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t("addressfromdetail.label")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            value={formValues.landmark}
            label={t("addressfromLandmark.label")}
            name="Landmark"
            fullWidth
            inputProps={{
              maxLength: 100,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={error === true ? "กรุณากรอกจุดสังเกต" : ""}
            error={error}
            onBlur={handleerror}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            value={formValues.address}
            label={t("addressfromadress.label")}
            name="Address"
            fullWidth
            inputProps={{
              maxLength: 100,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={error === true ? t("addressfromerror.label") : ""}
            error={error}
            onBlur={handleerror}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            value={zipCode}
            onChange={(e) => onSetZipCode(e.target.value)}
            id="zipCode"
            label={t("addressfrompost.label")}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t("addressfromsubDistrict.label")}
            </InputLabel>
            <Select
              onChange={(e) => onSetDistrict(e.target.value)}
              value={subDistrictSelect}
              disabled={isDisabledSubDistrictSelect}
              id="subDistrict"
            >
              {!isDisabledSubDistrictSelect &&
                subDistrict.map((item, index) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            value={district}
            label={t("addressfromdistrict.label")}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            value={province}
            id="province"
            label={t("addressfromsubprovince.label")}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t("nearbyplaces.label")}
          </Typography>
        </Grid>

        {items3}
      </Grid>
    </React.Fragment>
  );
}
