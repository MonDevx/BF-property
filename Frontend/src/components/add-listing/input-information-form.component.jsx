import DateFnsUtils from "@date-io/date-fns";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DropzoneArea } from "material-ui-dropzone";
import React from "react";
import SimpleMDEReact from "react-simplemde-editor";
import SimpleMap from "../map/map.component.jsx";
import Checkboxform from "./checkbox-form.component.jsx";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./styles.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
const thai = require("thai-data");

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
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  tab: {
    backgroundColor: theme.palette.background.paper,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(3),
  },
}));
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
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function InformationForm(props) {
  /* TODO  CLEAN CODE  */
  const [zipCode, setZipCode] = React.useState("");
  const [subDistrict, setSubDistrict] = React.useState(Array);
  const [subDistrictSelect, setSubDistrictSelect] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [isDisabledSubDistrictSelect, setIsDisabledSubDistrictSelect] =
    React.useState(true);
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const { t } = useTranslation();
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
  const { formValues, setFormValues, activeStep, handleBack, handleNext } =
    props;

  const handlefileoutsideChange = (files) => {
    setFormValues({
      ...formValues,
      filesoutside: files,
    });
  };
  const handlefileinsideChange = (files) => {
    setFormValues({
      ...formValues,
      filesinside: files,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "price" ||
      name === "propertysize" ||
      name === "numberofbathrooms" ||
      name === "numberoffloors" ||
      name === "numberofparkingspace" ||
      name === "numberofbedrooms"
    ) {
      setFormValues({ ...formValues, [name]: Number(value) });
    } else {
      if (name === "name") {
        setFormValues({
          ...formValues,
          [name]: value.replace(/\s+|[,\\/]/g, "-"),
        });
      } else {
        setFormValues({ ...formValues, [name]: value });
      }
    }
  };
  const handleDetailChange = (value) => {
    setFormValues({ ...formValues, detail: value });
  };
  const handleYearOfConstructionChange = (value) => {
    setFormValues({ ...formValues, yearofconstruction: value });
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
  const [inputNearbyplaces, setInputNearbyplaces] = React.useState([
    { LocationName: "", Distance: "" },
  ]);
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
  React.useEffect(() => {
    setFormValues({ ...formValues, nearbyplaces: inputNearbyplaces });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputNearbyplaces]);
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          {formValues.idtype === 3
            ? t("forminfoheadercondo.label")
            : t("forminfoheader.label")}
        </Typography>

        <Grid container spacing={2}>
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
                <AntTab
                  label={t("uploadfile.label")}
                  {...a11yProps(4)}
                ></AntTab>
              </AntTabs>
              <Typography className={classes.padding} />
            </div>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  onChange={handleChange}
                  value={formValues.name}
                  label={t("propertyname.label")}
                  id="name"
                  name="name"
                  fullWidth
                  variant="outlined"
                  inputProps={{
                    maxLength: 100,
                  }}
                  helperText={
                    error === true ? t("propertyrequiredname.label") : ""
                  }
                  error={error}
                  onBlur={handleerror}
                />
              </Grid>
              {formValues.idtype === 3 ? (
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    value={formValues.projectname}
                    label={t("projectname.label")}
                    id="projectname"
                    name="projectname"
                    fullWidth
                    inputProps={{
                      maxLength: 100,
                    }}
                    helperText={
                      error === true ? t("projectnameerror.label") : ""
                    }
                    error={error}
                    onBlur={handleerror}
                  />
                </Grid>
              ) : (
                ""
              )}

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  label={t("propertyprice.label")}
                  value={formValues.price}
                  onChange={handleChange}
                  name="price"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  name="propertysize"
                  type="number"
                  label={
                    formValues.idtype !== 3
                      ? t("propertysize.label")
                      : t("propertysizecondo.label")
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                  value={formValues.propertysize}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  label={
                    formValues.idtype !== 3
                      ? t("propertysizeprice.label")
                      : t("propertysizepricecondo.label")
                  }
                  value={(formValues.price / formValues.propertysize).toFixed(
                    2
                  )}
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {t("infomation.label")}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    {t("propertysizefamily.label")}
                  </InputLabel>
                  <Select
                    value={formValues.sizefamily}
                    onChange={handleChange}
                    name="sizefamily"
                    label={t("propertysizefamily.label")}
                    labelId="demo-simple-select-outlined-label"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>
                      {t("propertysizefamilytype1.label")}
                    </MenuItem>
                    <MenuItem value={2}>
                      {t("propertysizefamilytype2.label")}
                    </MenuItem>
                    <MenuItem value={3}>
                      {t("propertysizefamilytype3.label")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  variant="outlined"
                  name="numberofbedrooms"
                  label={t("propertybed.label")}
                  type="number"
                  value={formValues.numberofbedrooms}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 1);
                  }}
                  inputProps={{ min: "0", max: "9", step: "1" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  variant="outlined"
                  name="numberofbathrooms"
                  label={t("propertybath.label")}
                  type="number"
                  value={formValues.numberofbathrooms}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 1);
                  }}
                  inputProps={{ min: "0", max: "9", step: "1" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    inputVariant="outlined"
                    id="yearofconstruction"
                    views={["year"]}
                    label={t("propertyyear.label")}
                    minDate={new Date("1900-01-01")}
                    maxDate={new Date()}
                    value={formValues.yearofconstruction}
                    onChange={handleYearOfConstructionChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  variant="outlined"
                  name="numberofparkingspace"
                  label={t("propertycar.label")}
                  type="number"
                  value={formValues.numberofparkingspace}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 1);
                  }}
                  inputProps={{ min: "0", max: "9", step: "1" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  variant="outlined"
                  name="numberoffloors"
                  label={
                    formValues.idtype === 3
                      ? t("propertyfloorscondo.label")
                      : t("propertyfloors.label")
                  }
                  type="number"
                  value={formValues.numberoffloors}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, formValues.idtype === 3 ? 2 : 1);
                  }}
                  inputProps={{
                    min: "0",
                    max: formValues.idtype === 3 ? "70" : "5",
                    step: "1",
                  }}
                  fullWidth
                />
              </Grid>
              {formValues.idtype === 3 ? (
                <Grid item xs={12} sm={2}>
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    value={formValues.building}
                    label={t("building.label")}
                    id="building"
                    name="building"
                    fullWidth
                    inputProps={{
                      maxLength: 100,
                    }}
                    helperText={error === true ? t("buildingerror.label") : ""}
                    error={error}
                    onBlur={handleerror}
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Checkboxform
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid item sm={12}>
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
                variant="outlined"
                onChange={handleChange}
                value={formValues.landmark}
                label={t("addressfromLandmark.label")}
                name="landmark"
                fullWidth
                inputProps={{
                  maxLength: 100,
                }}
                helperText={
                  error === true ? t("addressfromLandmark2.label") : ""
                }
                error={error}
                onBlur={handleerror}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                onChange={handleChange}
                value={formValues.address}
                label={t("addressfromadress.label")}
                name="address"
                fullWidth
                inputProps={{
                  maxLength: 100,
                }}
                helperText={
                  error === true ? t("addressfromLandmark2.label") : ""
                }
                error={error}
                onBlur={handleerror}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                value={zipCode}
                onChange={(e) => onSetZipCode(e.target.value)}
                id="zipCode"
                label={t("addressfrompost.label")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  {t("addressfromsubDistrict.label")}
                </InputLabel>
                <Select
                  onChange={(e) => onSetDistrict(e.target.value)}
                  value={subDistrictSelect}
                  disabled={zipCode.length === 5 ? false : true}
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
                variant="outlined"
                value={district}
                label={t("addressfromdistrict.label")}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
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
            {inputNearbyplaces.map((x, i) => {
              return (
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    id="LocationName"
                    label={t("locationnameinput.label")}
                    name="LocationName"
                    placeholder={t("locationnameinputplaceholder.label")}
                    value={x.LocationName}
                    onChange={(e) => handleInputChange(e, i)}
                    style={{ paddingBottom: "5%" }}
                  />
                  <TextField
                    variant="outlined"
                    id="Distance"
                    label={t("distanceinput.label")}
                    name="Distance"
                    placeholder={t("distanceinputplaceholder.label")}
                    type="number"
                    value={x.Distance}
                    onChange={(e) => handleInputChange(e, i)}
                  />

                  {inputNearbyplaces.length !== 1 && (
                    <IconButton aria-label="delete" onClick={() => handleRemoveClick(i)} size="large">
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {inputNearbyplaces.length - 1 === i && (
                    <IconButton aria-label="add" onClick={handleAddClick} size="large">
                      <AddCircleIcon />
                    </IconButton>
                  )}
                </Grid>
              );
            })}

          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid item xs={12}>
              <SimpleMDEReact
                id="detail"
                onChange={handleDetailChange}
                value={formValues.detail}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("imgoutside.label")}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                {t("uploadfilehelp1.label")}
              </Typography>

              <Typography variant="subtitle2" color="secondary" gutterBottom>
                {t("uploadfilehelp2.label")}
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                onChange={handlefileoutsideChange}
                dropzoneText={t("uploadfiledropzoneText.label")}
                filesLimit={5}
                maxFileSize={5000000}
                showFileNames
                initialFiles={formValues.filesoutside}
                alertSnackbarProps={{
                  anchorOrigin: { horizontal: "right", vertical: "top" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("imginside.label")}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                {t("uploadfilehelp1.label")}
              </Typography>

              <Typography variant="subtitle2" color="secondary" gutterBottom>
                {t("uploadfilehelp2.label")}
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                onChange={handlefileinsideChange}
                dropzoneText={t("uploadfiledropzoneText.label")}
                filesLimit={5}
                maxFileSize={5000000}
                showFileNames
                initialFiles={formValues.filesinside}
              />
            </Grid>
          </TabPanel>
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
            onClick={handleNext}
            className={classes.button}
            onClick={() => handleNext(formValues)}
            disabled={
              formValues.name === "" ||
              formValues.detail === "" ||
              formValues.zipCode === "" ||
              formValues.subDistrictSelect === "" ||
              formValues.filesinside.length === 0 ||
              formValues.filesoutside.length === 0
            }
          >
            {t("next.label")}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
