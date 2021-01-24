import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
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

export default function EditinformationForm(props) {
  const classes = useStyles();
  const [error, setError] = React.useState(Boolean);
  const { formValues, setFormValues } = props;
  const { t } = useTranslation();
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "price" ||
      name === "Housesize" ||
      name === "Numberofbathrooms" ||
      name === "Numberoffloors" ||
      name === "Numberofparkingspace" ||
      name === "Numberofbedrooms"
    ) {
      setFormValues({ ...formValues, [name]: Number(value) });
    } else {
      if (name == "name") {
        setFormValues({
          ...formValues,
          [name]: value.replace(/\s+|[,\/]/g, "-"),
        });
      } else {
        setFormValues({ ...formValues, [name]: value });
      }
    }
  };

  const handleYearofconstructionChange = (value) => {
    setFormValues({ ...formValues, Yearofconstruction: value });
  };

  const handleerror = (event) => {
    const { value } = event.target;
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          container
          spacing={2}
          className={classes.howtoContent}
        >
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              {t("propertyheader.label")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              value={formValues.name}
              label={t("propertyname.label")}
              id="name"
              name="name"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                maxLength: 100,
              }}
              helperText={error === true ? t("propertynameerror.label") : ""}
              error={error}
              onBlur={handleerror}
            />
          </Grid>
          {formValues.idtype === 3 ? (
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={handleChange}
                value={formValues.projectname}
                label={t("projectname.label")}
                id="projectname"
                name="projectname"
                fullWidth
                inputProps={{
                  maxLength: 100,
                }}
                helperText={error === true ? t("projectnameerror.label") : ""}
                error={error}
                onBlur={handleerror}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={4}></Grid>
          )}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
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
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              name="Housesize"
              value={formValues.Housesize}
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
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label={
                formValues.idtype !== 3
                  ? t("propertysizeprice.label")
                  : t("propertysizepricecondo.label")
              }
              value={(formValues.price / formValues.Housesize).toFixed(2)}
              onChange={handleChange}
              InputProps={{
                inputComponent: NumberFormatCustom,
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              {t("propertydetail.label")}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <InputLabel id="demo-simple-select-label">
              {t("propertysizefamily.label")}{" "}
            </InputLabel>
            <Select
              fullWidth
              name="sizefamily"
              onChange={handleChange}
              value={Number(formValues.sizefamily)}
            >
              <MenuItem value={1}>
                {t("propertysizefamilytype1.label")}{" "}
              </MenuItem>
              <MenuItem value={2}>
                {t("propertysizefamilytype2.label")}{" "}
              </MenuItem>
              <MenuItem value={3}>
                {t("propertysizefamilytype3.label")}{" "}
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              name="Numberofbedrooms"
              label={t("propertybed.label")}
              type="number"
              onChange={handleChange}
              value={formValues.Numberofbedrooms}
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
          <Grid item xs={6} sm={3}>
            <TextField
              name="Numberofbathrooms"
              label={t("propertybath.label")}
              type="number"
              onChange={handleChange}
              value={formValues.Numberofbathrooms}
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
          <Grid item xs={6} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                id="Yearofconstruction"
                views={["year"]}
                label={t("propertyyear.label")}
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
                value={new Date(formValues.Yearofconstruction + "-01-01")}
                onChange={handleYearofconstructionChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              name="Numberofparkingspace"
              label={t("propertycar.label")}
              type="number"
              onChange={handleChange}
              value={formValues.Numberofparkingspace}
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
          <Grid item xs={6} sm={3}>
            <TextField
              name="Numberoffloors"
              label={
                formValues.idtype === 3
                  ? t("propertyfloorscondo.label")
                  : t("propertyfloors.label")
              }
              type="number"
              onChange={handleChange}
              value={formValues.Numberoffloors}
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
          {formValues.idtype === 3 ? (
            <Grid item xs={12} sm={2}>
              <TextField
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
      </Grid>
    </React.Fragment>
  );
}
