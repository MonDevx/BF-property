import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Linkui from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import "react-phone-input-2/lib/material.css";
import { isMobile } from "react-device-detect";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(10),
    },
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
});

const useStyles = makeStyles(styles);

function Editprofile() {
  const classes = useStyles();
  const { t } = useTranslation();
  const alert = useAlert();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [User, setUser] = useState(currentUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      firestore
        .collection("users")
        .doc(User.id)
        .update(User)
        .then(() => {
          alert.success(t("updateinfosuccess.label"));
        });
    } catch (err) {
      alert.error(t("updateinfoerror.label"));
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "gender") {
      setUser({ ...User, [name]: Number(value) });
    } else {
      setUser({ ...User, [name]: value });
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "4%", paddingBottom: "4%" }}
    >
      <Paper className={classes.paper} elevation={3}>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) =>
            alert.error(t("updateinfoerror2.label"))
          }
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Linkui
                  color="inherit"
                  className={classes.link}
                  to="/profile"
                  component={Link}
                >
                  <AiOutlineUser className={classes.icon} />
                  {t("myacc.label")}
                </Linkui>

                <Typography color="textPrimary" className={classes.link}>
                  <AiOutlineEdit className={classes.icon} />
                  {t("editinformation.label")}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
              <Typography  variant="h4" gutterBottom style={{ 'fontWeight': 'bold' }}>{t("info.label")}</Typography>
            </Grid>

            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                label={t("displayname.label")}
                onChange={handleChange}
                name="displayName"
                value={User.displayName}
                validators={["required"]}
                errorMessages={t("displaynamerequired.label")}
              />
            </Grid>
            <Grid item xs={6}>
              <PhoneInput
                name="phone"
                country={"th"}
                value={User.phone}
                specialLabel={t("phone.label")}
                inputStyle={{
                  fontFamily: "prompt",
                  height: "55px",
                }}
                containerStyle={{
                  fontFamily: "prompt",
                }}
                disableDropdown={true}
                defaultErrorMessage={t("phonerequired.label")}
                onChange={(phone) =>
                  setUser({ ...User, phone: phone })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">
                  {t("sex.label")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={User.gender ? User.gender : 1}
                  onChange={handleChange}
                  label={t("sex.label")}
                  name="gender"
                >
                  <MenuItem value={1}>{t("typesex1.label")}</MenuItem>
                  <MenuItem value={2}>{t("typesex2.label")}</MenuItem>
                  <MenuItem value={3}>{t("typesex3.label")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextValidator
                variant="outlined"
                type="date"
                label={t("birthday.label")}
                onChange={handleChange}
                name="birthday"
                value={User.birthday}
                validators={["required"]}
                InputLabelProps={{
                  shrink: true,
                }}
                errorMessages={[t("birthdayrequired.label")]}
              />
            </Grid>
            <Grid item xs={isMobile ? 10 : 4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<SystemUpdateAltIcon />}
                disabled={
                  JSON.stringify(User) === JSON.stringify(currentUser)
                    ? true
                    : false
                }
              >
                {t("updateinfobutton.label")}
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Paper>
    </Container>
  );
}

export default Editprofile;
