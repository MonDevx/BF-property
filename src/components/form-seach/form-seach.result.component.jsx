import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import data from "../../json/province.json";
const provicejson = data;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  seachbox: {
    marginTop: theme.spacing(2),
  },
}));

export default function Formseachresult() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [typehouse, settypehouse] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [family, setFamily] = React.useState(0);
  const [bath, setBath] = React.useState(0);
  const [room, setRoom] = React.useState(0);
  const [car, setCar] = React.useState(0);
  const [sizeproperty, setProperty] = React.useState(0);
  const [provice, setprovice] = React.useState("");
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChangetypehouse = (event) => {
    settypehouse(event.target.value);
  };
  const handleChangeprice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangeroom = (event) => {
    setRoom(Number(event.target.value));
  };
  const handleChangefamily = (event) => {
    setFamily(event.target.value);
  };
  const handleChangebath = (event) => {
    setBath(Number(event.target.value));
  };
  const handleChangecar = (event) => {
    setCar(Number(event.target.value));
  };
  const handleChangesizeproperty = (event) => {
    setProperty(event.target.value);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const onchangeprovice = (value) => {
    if (value !== null) {
      setprovice(value.name);
    } else {
      setprovice("");
    }
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" className={classes.seachbox}>
      <Card>
        <CardActions>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={2}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  {t("typehouse.label")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={typehouse}
                  onChange={handleChangetypehouse}
                >
                  <MenuItem value={0}>{t("totaltype.label")}</MenuItem>
                  <MenuItem value={1}>{t("typehouse1.label")}</MenuItem>
                  <MenuItem value={2}>{t("typehouse2.label")}</MenuItem>
                  <MenuItem value={3}>{t("typehouse3.label")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Autocomplete
                id="combo-box-demo"
                options={provicejson}
                getOptionLabel={(option) => option.name}
                fullWidth
                onChange={(event, value) => onchangeprovice(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("addressfromsubprovince.label")}
                    variant="outlined"
                    className={classes.formControl}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  {t("pricebetween.label")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={price}
                  onChange={handleChangeprice}
                >
                  <MenuItem value={0}>{t("totalprice.label")}</MenuItem>
                  <MenuItem value={1}>{t("pricebetween1.label")}</MenuItem>
                  <MenuItem value={2}>{t("pricebetween2.label")}</MenuItem>
                  <MenuItem value={3}>{t("pricebetween3.label")}</MenuItem>
                  <MenuItem value={4}>{t("pricebetween4.label")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <TextField
                  variant="outlined"
                  label={t("propertybed.label")}
                  type="number"
                  value={room}
                  onChange={handleChangeroom}
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
              </FormControl>
            </Grid>
            <Grid item sm={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={classes.formControl}
                component={Link}
                startIcon={<SearchRoundedIcon />}
                to={{
                  pathname: "/seach-result",
                  state: {
                    type: typehouse,
                    province: provice,
                    price: price,
                    room: room,
                    family: family,
                    bath: bath,
                    car: car,
                    size: sizeproperty,
                    check: state.checkedA,
                  },
                }}
              >
                {t("seach.label")}
              </Button>
            </Grid>
          </Grid>
          <IconButton
            className={clsx(classes.expand, classes.margin, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    {t("propertysizefamily.label")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={family}
                    onChange={handleChangefamily}
                    labelWidth={110}
                  >
                    <MenuItem value={0}>{t("totalfamliy.label")}</MenuItem>
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
              <Grid item xs={12} sm={2}>
                <TextField
                  variant="outlined"
                  label={t("propertybath.label")}
                  type="number"
                  value={bath}
                  onChange={handleChangebath}
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
              <Grid item xs={12} sm={2}>
                <TextField
                  variant="outlined"
                  label={t("propertycar.label")}
                  type="number"
                  value={car}
                  onChange={handleChangecar}
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
              <Grid item xs={12} sm={2}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    {t("sizehousebetween.label")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={sizeproperty}
                    onChange={handleChangesizeproperty}
                  >
                    <MenuItem value={0}>{t("totalsize.label")}</MenuItem>
                    <MenuItem value={1}>
                      {t("sizehousebetween1.label")}
                    </MenuItem>
                    <MenuItem value={2}>
                      {t("sizehousebetween2.label")}
                    </MenuItem>
                    <MenuItem value={3}>
                      {t("sizehousebetween3.label")}
                    </MenuItem>
                    <MenuItem value={4}>
                      {t("sizehousebetween4.label")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>{t("facility.label")}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={t("facilityformtopic1.label")}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
