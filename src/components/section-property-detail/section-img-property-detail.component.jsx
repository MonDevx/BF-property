import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import ImageGallery from "react-image-gallery";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";
import stylegallery from "./section-img-property-detail.css";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import {
  FacebookShareButton,
  FacebookIcon,
  LineIcon,
  LineShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  img: {
    backgroundColor: "#303441",
    padding: theme.spacing(2),
  },
  toolbarItem: {
    color: theme.palette.common.white,
    padding: theme.spacing(1),
  },
}));
function formatMoney(number) {
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
function Img(props) {
  const url = window.location.href;
  const { t } = useTranslation();
  const options = [
    props.typeproperty !== 3
      ? t("imgoutside.label")
      : t("imgcondooutside.label"),
    props.typeproperty !== 3 ? t("imginside.label") : t("imgcondoinside.label"),
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [images, setimages] = React.useState(props.urloutside);
  const { currentUser } = props;
  const alert = useAlert();
  var BreakException = {};
  const handleFavorite = (e) => {
    try {
      var favorite = currentUser.favorite;
      var check = false;
      if (favorite.length === 0) {
        favorite.push(e.currentTarget.value);

        firestore
          .collection("users")
          .doc(currentUser.id)
          .update({ favorite: favorite })
          .then(() => {
            alert.success(t("alertaddfavoriteproperty"));
          });
      } else {
        favorite.forEach((element, index) => {
          if (element === e.currentTarget.value) {
            check = true;
            favorite.splice(index, 1);
          }
        });
        if (check === false) {
          favorite.push(e.currentTarget.value);

          firestore
            .collection("users")
            .doc(currentUser.id)
            .update({ favorite: favorite })
            .then(() => {
              alert.success(t("alertaddfavoriteproperty"));
            });
        } else {
          firestore
            .collection("users")
            .doc(currentUser.id)
            .update({ favorite: favorite })
            .then(() => {
              alert.success(t("alertdeletefavoriteproperty"));
            });
        }
      }
    } catch (error) {
      alert.error(error);

      if (e !== BreakException) throw e;
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if (index === 0) {
      setimages(props.urloutside);
    } else {
      setimages(props.urlinside);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <div className={classes.img}>
      <Container maxWidth="lg">
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item>
            <IconButton
              value={props.id}
              aria-label="add to favorites"
              onClick={handleFavorite}
              disabled={currentUser ? false : true}
            >
              {currentUser !== null ? (
                <FavoriteIcon
                  style={{ fontSize: 27 }}
                  color={
                    currentUser.favorite.find(
                      (element) => element === props.id
                    ) !== undefined
                      ? "error"
                      : ""
                  }
                />
              ) : (
                <FavoriteIcon />
              )}
            </IconButton>
          </Grid>
          <Grid item style={{ padding: "0.20%" }}>
            <FacebookShareButton
              url={url}
              hashtag="#หาบ้านในฝันที่ BF-property"
            >
              <FacebookIcon size={27} round={true} />
            </FacebookShareButton>
          </Grid>
          <Grid item style={{ padding: "0.20%" }}>
            <LineShareButton
              url={window.location.href}
              hashtag="#หาบ้านในฝันที่ BF-property"
            >
              <LineIcon size={27} round={true} />
            </LineShareButton>
          </Grid>
          <Grid item>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.toolbarItem}
            >
              {options[selectedIndex]}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row-reverse"
          justify="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            className={classes.toolbarItem}
            color="success"
          >
            {t("price.label")}{" "}
            {formatMoney(
              props.currency === "gb"
                ? props.price * 0.032
                : props.currency === "th"
                ? props.price
                : props.price * 0.21
            )}{" "}
            {props.currency === "gb"
              ? t("dollar.label")
              : props.currency === "th"
              ? t("baht.label")
              : t("yuan.label")}
          </Typography>

          <Typography variant="h5" className={classes.toolbarItem}>
            {props.name.replaceAll("-", " ")}
          </Typography>
        </Grid>
        <div align="center">
          <ImageGallery
            style={{ stylegallery }}
            items={images}
            showBullets={true}
            showIndex={true}
            showThumbnails={true}
            autoPlay={true}
            thumbnailPosition="right"
          />
        </div>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(Img);
