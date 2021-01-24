import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { withAlert } from "react-alert";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { firestore } from "../../firebase/firebase.utils";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import Linkmu from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ListAltIcon from "@material-ui/icons/ListAlt";
import UpdateIcon from "@material-ui/icons/Update";
const styles = (theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(10),
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
});
class Updatestatusproperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state.id,
      status: this.props.location.state.status,
    };
  }

  handleSubmit = async (event) => {
    const { t } = this.props;
    event.preventDefault();

    firestore
      .collection("house")
      .doc(this.state.id)
      .update({ status: this.state.status })
      .then(() => {
        this.props.alert.success(t("alertupdatestatuspropertysuccess.label"));
      })
      .catch((err) => {
        this.props.alert.success(t("alertupdatestatuspropertyerror.label"));
      });
  };

  handleChange = (event) => {
    this.setState({ status: event.target.value });
  };

  render() {
    const { t } = this.props;
    const { classes } = this.props;
    return (
      <Container
        maxWidth="md"
        style={{ paddingTop: "4%", paddingBottom: "4%" }}
      >
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Linkmu color="inherit" component={Link} to="/my-house">
                  <ListAltIcon className={classes.icon} />
                  {t("myhouse.name.label")}
                </Linkmu>

                <Typography variant="h6">
                  <UpdateIcon className={classes.icon} />
                  {t("updatestatuspropertybutton.label")}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-helper-label">{t("updatestatusproperty.label")}</InputLabel>
                <Select
                  name="sizefamily"
                  onChange={this.handleChange}
                  value={this.state.status}
                >
                  <MenuItem value={1}>
                    {t("statuspropertytype1.label")}
                  </MenuItem>
                  <MenuItem value={2}>
                    {t("statuspropertytype2.label")}
                  </MenuItem>
                  <MenuItem value={3}>
                    {t("statuspropertytype3.label")}
                  </MenuItem>
                  <MenuItem value={4}>
                    {"ให้เห็นเฉพาะส่วนตัว"}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                style={{ backgroundColor: "#55aa54", marginTop: "3.5%" }}
                onClick={this.handleSubmit}
              >
                {t("updatestatuspropertybutton.label")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default compose(
  withRouter,
  withAlert(),
  withStyles(styles),
  withTranslation()
)(Updatestatusproperty);
