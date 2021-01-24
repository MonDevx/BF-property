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
import BathtubIcon from "@material-ui/icons/Bathtub";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HotelIcon from "@material-ui/icons/Hotel";
import RoomIcon from "@material-ui/icons/Room";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import UpdateIcon from "@material-ui/icons/Update";
import React from "react";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SkletonCard } from "../customs/skeleton/skeleton-card/skeleton-card.component.jsx";
import Skeleton from "@material-ui/lab/Skeleton";
import { ChipStatus } from "../customs/chip-customs/chip-customs";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));
function currencyFormat(num) {
  return (
    "$" +
    Number(num)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

function Cardhouse(props) {
  const { t } = useTranslation();
  const { currentTodos, currentUser } = props;
  const [open, setOpen] = React.useState(false);
  var property = [];
  const [deletepropertyvalue, Setdeletepropertyvalue] = React.useState({});
  const handleClickOpen = (id, index) => {
    setOpen(true);
    property = currentTodos.filter((e) => e.id === id);
    Setdeletepropertyvalue(property[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      {/* End hero unit */}
      <Grid container spacing={3} style={{ marginTop: 15 }}>
        {currentTodos.map((currentTodo, index) => (
          <Grid item sm={3} key={index}>
            <Card className={classes.card} aria-label={"property"}>
              <LazyLoad placeholder={<SkletonCard />}>
                <CardActionArea
                  component={Link}
                  to={{
                    pathname: "/property-detail/" + currentTodo.name,
                  }}
                  aria-label={"property"}
                >
                  {currentTodo.firstimg ? (
                    <CardMedia
                      className={classes.cardMedia}
                      image={currentTodo.firstimg}
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
                      <Grid item sm={12}>
                        <Typography variant="h6">
                          {currentTodo.name.length < 28
                            ? currentTodo.name.replaceAll("-", " ")
                            : currentTodo.name
                                .replaceAll("-", " ")
                                .substring(0, 28) + " ..."}
                        </Typography>
                      </Grid>
                      <Grid item sm={12}>
                        <Typography variant="subtitle2">
                          {currentTodo.idtype === 1
                            ? t("typehouse1.label")
                            : currentTodo.idtype === 2
                            ? t("typehouse2.label")
                            : t("typehouse3.label")}
                        </Typography>
                      </Grid>

                      <Grid item sm={12}>
                        <Typography variant="subtitle2">
                          <RoomIcon fontSize="small" />
                          {(
                            currentTodo.Address +
                            " " +
                            currentTodo.District +
                            " " +
                            currentTodo.subDistrict +
                            " " +
                            currentTodo.province +
                            " " +
                            currentTodo.zipCode
                          ).length < 52
                            ? currentTodo.Address +
                              " " +
                              currentTodo.District +
                              " " +
                              currentTodo.subDistrict +
                              " " +
                              currentTodo.province +
                              " " +
                              currentTodo.zipCode+
                              "                  "
                            : (
                                currentTodo.Address +
                                " " +
                                currentTodo.District +
                                " " +
                                currentTodo.subDistrict +
                                " " +
                                currentTodo.province +
                                " " +
                                currentTodo.zipCode
                              ).substring(0, 52) + " ..."}
                        </Typography>
                      </Grid>
                      <Grid item sm={12}>
                        <Typography variant="h6" color="success">
                          {currencyFormat(currentTodo.price)} {t("baht.label")}
                        </Typography>
                      </Grid>
                      <Grid item sm={3}>
                        <Typography variant="subtitle2">
                          {currentTodo.Numberofbedrooms}
                          <HotelIcon fontSize="small" />
                        </Typography>
                      </Grid>
                      <Grid item sm={3} >
                        <Typography variant="subtitle2">
                          {currentTodo.Numberofbathrooms}
                          <BathtubIcon fontSize="small" />
                        </Typography>
                      </Grid>
                      <Grid item sm={3}>
                        <Typography variant="subtitle2">
                          {currentTodo.Housesize}
                          <SquareFootIcon fontSize="small" />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid item sm={4}>
                    <ChipStatus status={currentTodo.status} />
                  </Grid>
                  <div style={{ marginLeft: "auto" }}>
                    {window.location.pathname !== "/my-house" ? (
                      <IconButton
                        value={currentTodo.id}
                        aria-label="add to favorites"
                        onClick={props.onhandleFavorite}
                        disabled={currentUser ? false : true}
                        size="small"
                      >
                        {currentUser && currentUser.favorite !== undefined ? (
                          <Tooltip
                            title={
                              currentUser.favorite.find(
                                (element) => element === currentTodo.id
                              ) !== undefined
                                ? t("deletefavorite.label")
                                : t("addfavorite.label")
                            }
                            aria-label="add"
                          >
                            <FavoriteIcon
                              color={
                                currentUser.favorite.find(
                                  (element) => element === currentTodo.id
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
                          title={t("updatestaushouse.label")}
                          aria-label="add"
                        >
                          <IconButton
                            component={Link}
                            to={{
                              pathname: "/property-updatestatus",
                              state: {
                                id: currentTodo.id,
                                status: currentTodo.status,
                              },
                            }}
                          >
                            <UpdateIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t("edithouse.label")} aria-label="add">
                          <IconButton
                            component={Link}
                            to={{
                              pathname: "/property-edit",
                              state: {
                                id: currentTodo.id,
                              },
                            }}
                          >
                            <EditRoundedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={t("deletehouse.label")}
                          aria-label="add"
                        >
                          <IconButton
                            aria-label="detele to favorites"
                            onClick={() =>
                              handleClickOpen(currentTodo.id, index)
                            }
                          >
                            <DeleteIcon />
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
                {t("deletehouseask.label")}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {t("namehouse.label")}

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
});

export default connect(mapStateToProps)(Cardhouse);
