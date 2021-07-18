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
import { useTranslation } from "next-i18next";
import Link from 'next/link'
import data from "../../public/json/province.json";
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
    padding: theme.spacing(1.5),
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
      <Card className={classes.card}>
        <CardActions>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={2}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  {t("seach-form:typeproperty.label")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={typeproperty}
                  onChange={handleChangetypeproperty}
                  label={t("seach-form:typeproperty.label")}
                >
                  <MenuItem value={0}>{t("seach-form:totaltype.label")}</MenuItem>
                  <MenuItem value={1}>{t("seach-form:typeproperty1.label")}</MenuItem>
                  <MenuItem value={2}>{t("seach-form:typeproperty2.label")}</MenuItem>
                  <MenuItem value={3}>{t("seach-form:typeproperty3.label")}</MenuItem>
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
                    label={t("seach-form:addressfromsubprovince.label")}
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
                  {t("seach-form:pricebetween.label")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={price}
                  onChange={handleChangeprice}
                  label={t("seach-form:pricebetween.label")}
                >
                  <MenuItem value={0}>{t("seach-form:totalprice.label")}</MenuItem>
                  <MenuItem value={1}>{t("seach-form:pricebetween1.label")}</MenuItem>
                  <MenuItem value={2}>{t("seach-form:pricebetween2.label")}</MenuItem>
                  <MenuItem value={3}>{t("seach-form:pricebetween3.label")}</MenuItem>
                  <MenuItem value={4}>{t("seach-form:pricebetween4.label")}</MenuItem>
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
                  label={t("seach-form:propertybed.label")}
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
                  state: {
                    type: typeproperty,
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
                {t("seach-form:seach.label")}
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
          <CardContent >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    {t("seach-form:propertysizefamily.label")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={family}
                    onChange={handleChangefamily}
                    label={t("seach-form:propertysizefamily.label")}
                  >
                    <MenuItem value={0}>{t("seach-form:totalfamliy.label")}</MenuItem>
                    <MenuItem value={1}>
                      {t("seach-form:propertysizefamilytype1.label")}
                    </MenuItem>
                    <MenuItem value={2}>
                      {t("seach-form:propertysizefamilytype2.label")}
                    </MenuItem>
                    <MenuItem value={3}>
                      {t("seach-form:propertysizefamilytype3.label")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  variant="outlined"
                  label={t("seach-form:propertybath.label")}
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
                  label={t("seach-form:propertycar.label")}
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
                    {t("seach-form:sizepropertybetween.label")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={sizeproperty}
                    onChange={handleChangesizeproperty}
                    label={t("seach-form:sizepropertybetween.label")}
                  >
                    <MenuItem value={0}>{t("seach-form:totalsize.label")}</MenuItem>
                    <MenuItem value={1}>
                      {t("seach-form:sizepropertybetween1.label")}
                    </MenuItem>
                    <MenuItem value={2}>
                      {t("seach-form:sizepropertybetween2.label")}
                    </MenuItem>
                    <MenuItem value={3}>
                      {t("seach-form:sizepropertybetween3.label")}
                    </MenuItem>
                    <MenuItem value={4}>
                      {t("seach-form:sizepropertybetween4.label")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>{t("seach-form:facility.label")}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={t("seach-form:facilityformtopic1.label")}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
