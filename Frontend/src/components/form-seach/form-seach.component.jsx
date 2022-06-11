import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import makeStyles from "@mui/styles/makeStyles";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { Link } from "react-router-dom";
import data from "../../json/province.json";
import { useTranslation } from "react-i18next";
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
    marginTop: theme.spacing(15),
  },
  card: {
    padding: theme.spacing(1.5),
  },
}));

export default function Formseach() {
  const classes = useStyles();
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

  const onchangeprovice = (value) => {
    if (value !== null) {
      setprovice(value.name);
    } else {
      setprovice("");
    }
  };
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" className={classes.seachbox}>
      <Card className={classes.card}>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={2}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="typeproperty-label">
                  {t("typeproperty.label")}
                </InputLabel>
                <Select
                  labelId="typeproperty-label"
                  id="typeproperty"
                  value={type}
                  onChange={handleChangeType}
                  label={t("typeproperty.label")}
                >
                  <MenuItem value={0}>{t("totaltype.label")}</MenuItem>
                  <MenuItem value={1}>{t("typeproperty1.label")}</MenuItem>
                  <MenuItem value={2}>{t("typeproperty2.label")}</MenuItem>
                  <MenuItem value={3}>{t("typeproperty3.label")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
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
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="price-label">
                  {t("pricebetween.label")}
                </InputLabel>
                <Select
                  labelId="price-label"
                  id="price"
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
              <TextField
                id="room"
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
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ padding: "4%" }}
                component={Link}
                to={{
                  pathname: "/seach-result",
                  search: qs.stringify({
                    type: type,
                    province: provice,
                    price: price,
                    room: room,
                  }),
                }}
                startIcon={<SearchRoundedIcon />}
                aria-label={t("seach.label")}
              >
                {t("seach.label")}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
}
