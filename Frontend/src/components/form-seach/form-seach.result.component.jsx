import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import makeStyles from '@mui/styles/makeStyles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Autocomplete from '@mui/material/Autocomplete';
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import data from "../../json/province.json";
import qs from "query-string";
const provicejson = data;
const useStyles = makeStyles((theme) => ({
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
  card: {
    padding: theme.spacing(1.25),
  },

}));

export default function Formseachresult() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [typeproperty, settypeproperty] = React.useState(0);
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

  const handleChangetypeproperty = (event) => {
    settypeproperty(event.target.value);
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
      <Card >
        <CardActions >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            className={classes.card}
          >
            <Grid item xs={12} sm={2}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  {t("typeproperty.label")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={typeproperty}
                  onChange={handleChangetypeproperty}
                  label={t("typeproperty.label")}
                >
                  <MenuItem value={0}>{t("totaltype.label")}</MenuItem>
                  <MenuItem value={1}>{t("typeproperty1.label")}</MenuItem>
                  <MenuItem value={2}>{t("typeproperty2.label")}</MenuItem>
                  <MenuItem value={3}>{t("typeproperty3.label")}</MenuItem>
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
                  label={t("pricebetween.label")}
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
            <Grid item xs={12} sm={3}>
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
                  search: qs.stringify({
                    type: typeproperty,
                    province: provice,
                    price: price,
                    room: room,
                    family: family,
                    bath: bath,
                    car: car,
                    size: sizeproperty,
                    check: state.checkedA,
                  }),
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
            size="large">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent >
            <Grid container direction="row" justifyContent="flex-start" spacing={2}>
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
                    label={t("propertysizefamily.label")}
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
                    {t("sizepropertybetween.label")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={sizeproperty}
                    onChange={handleChangesizeproperty}
                    label={t("sizepropertybetween.label")}
                  >
                    <MenuItem value={0}>{t("totalsize.label")}</MenuItem>
                    <MenuItem value={1}>
                      {t("sizepropertybetween1.label")}
                    </MenuItem>
                    <MenuItem value={2}>
                      {t("sizepropertybetween2.label")}
                    </MenuItem>
                    <MenuItem value={3}>
                      {t("sizepropertybetween3.label")}
                    </MenuItem>
                    <MenuItem value={4}>
                      {t("sizepropertybetween4.label")}
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
