import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import Link from 'next/link'
import data from "../../public/json/province.json";
import { useTranslation } from "next-i18next";
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
    <Container maxWidth="md" className={classes.seachbox}>
      <Card className={classes.card}>
        <CardActions>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={3}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="typeproperty-label">
                  {t("seach-form:typeproperty.label")}
                </InputLabel>
                <Select
                  labelId="typeproperty-label"
                  id="typeproperty"
                  value={type}
                  onChange={handleChangeType}
                  label={t("seach-form:typeproperty.label")}
                >
                  <MenuItem value={0}>{t("seach-form:totaltype.label")}</MenuItem>
                  <MenuItem value={1}>{t("seach-form:typeproperty1.label")}</MenuItem>
                  <MenuItem value={2}>{t("seach-form:typeproperty2.label")}</MenuItem>
                  <MenuItem value={3}>{t("seach-form:typeproperty3.label")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
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
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ padding: "4%" }}
                // component={Link}
                // to={{
                //   pathname: "/seach-result",
                //   state: {
                //     type: type,
                //     province: provice,
                //     price: price,
                //     room: room,
                //     family: 0,
                //     bath: 0,
                //     car: 0,
                //     size: 0,
                //     check: true,
                //   },
                // }}
                startIcon={<SearchRoundedIcon />}
                aria-label={t("seach-form:seach.label")}
              >
                {t("seach-form:seach.label")}
              </Button>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="price-label">
                  {t("seach-form:pricebetween.label")}
                </InputLabel>
                <Select
                  labelId="price-label"
                  id="price"
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
            <Grid item xs={12} sm={3}>
              <TextField
              id="room"
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
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
}
