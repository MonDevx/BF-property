import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import data from "../../json/province.json";
import { useTranslation } from "react-i18next";
const provicejson = data;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
    marginTop: theme.spacing(15),
  },
}));

export default function Formseach() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [type, setType] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [room, setRoom] = React.useState(0);
  const [provice, setprovice] = React.useState("");

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeprice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangeroom = (event) => {
    setRoom(Number(event.target.value));
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
  const { t } = useTranslation();
  return (
    <Container maxWidth="md" className={classes.seachbox}>
      <Card>
        <CardActions>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={3}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  {t("typehouse.label")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={type}
                  onChange={handleChangeType}
                  label={t("typehouse.label")}
                >
                  <MenuItem value={0}>{t("totaltype.label")}</MenuItem>
                  <MenuItem value={1}>{t("typehouse1.label")}</MenuItem>
                  <MenuItem value={2}>{t("typehouse2.label")}</MenuItem>
                  <MenuItem value={3}>{t("typehouse3.label")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                  />
                )}
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={{ padding: "6%", margin: "6%" }}
                component={Link}
                to={{
                  pathname: "/seach-result",
                  state: {
                    type: type,
                    province: provice,
                    price: price,
                    room: room,
                    family: 0,
                    bath: 0,
                    car: 0,
                    size: 0,
                    check: true,
                  },
                }}
                startIcon={<SearchRoundedIcon />}
                aria-label="ค้นหา"
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
              <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" fullWidth>
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
              <Grid item xs={12} sm={3}>
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
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
