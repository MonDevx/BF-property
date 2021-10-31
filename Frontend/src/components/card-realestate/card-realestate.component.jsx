import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SkletonCard } from "../customs/skeleton/skeleton-card/skeleton-card.component.jsx";
import Skeleton from "@material-ui/lab/Skeleton";
import { ChipStatus } from "../customs/chip-customs/chip-customs.jsx";
import {
  BiBath,
  BiBed,
  BiMap,
  BiGrid,
  BiEdit,
  BiTrash,
  BiTimeFive,
} from "react-icons/bi";
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  bold: {
    fontWeight: 600,
  },
  icon: {
    fontSize: 20,
  },
}));
function currencyFormat(num) {
  return (
    "$ " +
    Number(num)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

function CardProperty(props) {
  const { t } = useTranslation();
  const { currentProperty, currentUser, currency } = props;
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  var property = [];
  const [deletepropertyvalue, Setdeletepropertyvalue] = React.useState({});
  const handleClickOpen = (id, index) => {
    setOpen(true);
    property = currentProperty.filter((e) => e.id === id);
    Setdeletepropertyvalue(property[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const test = () => {
  //   axios({
  //     method: 'get',
  //     url: 'http://rate-exchange.appspot.com/currency?from=THB&to=USD&q=12'
  //   })
  //     .then(response => {
  //       console.log("response: ", response)
  //       // do something about response
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // };

  const classes = useStyles();
  return (
    <React.Fragment>
      {/* End hero unit */}
      <Grid container spacing={3} style={{ marginTop: 15 }}>
        {currentProperty.map((detail, index) => (
          <Grid item sm={3} key={index}>
            <Card className={classes.card} aria-label={"property"}>
              <LazyLoad placeholder={<SkletonCard />}>
                <CardActionArea
                  component={Link}
                  to={{
                    pathname: "/property-detail/" + detail.name,
                  }}
                  aria-label={"property"}
                >
                  {detail.firstimg ? (
                    <CardMedia
                      className={classes.cardMedia}
                      image={detail.firstimg}
                    />
                  ) : (
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      className={classes.cardMedia}
                    />
                  )}

                  <CardContent className={classes.cardContent}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="h6" className={classes.bold} noWrap>
                          {detail.name.replaceAll("-", " ")}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          {detail.idtype === 1
                            ? t("typeproperty1.label")
                            : detail.idtype === 2
                              ? t("typeproperty2.label")
                              : t("typeproperty3.label")}
                        </Typography>
                      </Grid>
                      <Grid item sm={12}>
                        <Typography
                          variant="h6"
                          color="primary"
                          style={{ fontWeight: 600 }}
                        >
                          {currencyFormat(
                            currency === "gb"
                              ? detail.price * 0.032
                              : currency === "th"
                                ? detail.price
                                : detail.price * 0.21
                          )}{" "}
                          {currency === "gb"
                            ? t("dollar.label")
                            : currency === "th"
                              ? t("baht.label")
                              : t("yuan.label")}
                        </Typography>
                      </Grid>
                      <Grid item sm={12}>
                        <Typography variant="subtitle2" noWrap>
                          <BiMap className={classes.icon} />
                          {
                            detail.address +
                            " " +
                            detail.district +
                            " " +
                            detail.subDistrict +
                            " " +
                            detail.province +
                            " " +
                            detail.zipCode
                          }
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Typography variant="subtitle2">
                              <BiBed className={classes.icon} />
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="button"
                              display="block"
                              gutterBottom
                              className={classes.bold}
                            >
                              {"0" + detail.numberofbedrooms}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle2">
                              <BiBath className={classes.icon} />
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="button"
                              display="block"
                              gutterBottom
                              className={classes.bold}
                            >
                              {"0" + detail.numberofbathrooms}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle2">
                              <BiGrid className={classes.icon} />
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="button"
                              display="block"
                              gutterBottom
                              className={classes.bold}
                            >
                              {detail.propertysize}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid item sm={4}>
                    <ChipStatus status={detail.status} />
                  </Grid>
                  <div style={{ marginLeft: "auto" }}>
                    {location.pathname !== "/my-property" ? (
                      <IconButton
                        value={detail.id}
                        aria-label="add to favorites"
                        onClick={props.onhandleFavorite}
                        disabled={currentUser ? false : true}
                        size="small"
                      >
                        {currentUser && currentUser.favorite !== undefined ? (
                          <Tooltip
                            title={
                              currentUser.favorite.find(
                                (element) => element === detail.id
                              ) !== undefined
                                ? t("deletefavorite.label")
                                : t("addfavorite.label")
                            }
                            aria-label="add"
                          >
                            <FavoriteIcon
                              color={
                                currentUser.favorite.find(
                                  (element) => element === detail.id
                                ) !== undefined
                                  ? "error"
                                  : "disabled"
                              }
                            />
                          </Tooltip>
                        ) : (
                          <FavoriteIcon />
                        )}
                      </IconButton>
                    ) : (
                      <React.Fragment>
                        
                        <Tooltip
                          title={t("updatestausproperty.label")}
                          aria-label="add"
                        >
                          <IconButton
                            component={Link}
                            to={{
                              pathname: "/property-updatestatus",
                              state: {
                                id: detail.id,
                                status: detail.status,
                              },
                            }}
                          >
                            <BiTimeFive />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={t("editproperty.label")}
                          aria-label="add"
                        >
                          <IconButton
                            component={Link}
                            to={{
                              pathname: "/property-edit",
                              state: {
                                id: detail.id,
                              },
                            }}
                          >
                            <BiEdit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={t("deleteproperty.label")}
                          aria-label="add"
                        >
                          <IconButton
                            aria-label="detele to favorites"
                            onClick={() => handleClickOpen(detail.id, index)}
                          >
                            <BiTrash />
                          </IconButton>
                        </Tooltip>
                      </React.Fragment>
                    )}
                  </div>
                </CardActions>
              </LazyLoad>
            </Card>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {t("deletepropertyask.label")}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {t("nameproperty.label")}

                  {" " + deletepropertyvalue.name}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {t("cancel.label")}
                </Button>
                <Button
                  onClick={() => {
                    props.deleteproperty(
                      deletepropertyvalue.id,
                      deletepropertyvalue.urlimginside,
                      deletepropertyvalue.urlimgoutside
                    );
                    setOpen(false);
                  }}
                  color="primary"
                  autoFocus
                >
                  {t("delete.label")}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(CardProperty);