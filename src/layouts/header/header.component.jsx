import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import { Item } from "@mui-treasury/components/flex";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Detector } from "react-detect-offline";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
const StyledBadge = withStyles((theme) => ({
  badge: {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  item: {
    marginRight: theme.spacing(1.5),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function Header(props) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [anchorE2, setAnchorE2] = React.useState(false);
  const options = [
    t("menu.lang.en.label"),
    t("menu.lang.th.label"),
    t("menu.lang.ch.label"),
  ];
  const langoptions = ["gb", "th", "cn"];

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    i18n.changeLanguage(langoptions[index]);

    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const signout = () => {
    setAnchorE2(null);
    auth.signOut().then(() => {
      window.location.reload();
    });
  };

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root} color="inherit">
      <Toolbar className={classes.toolbar}>
        <Item
     
          component={Link}
          to="/"
        >
          <img src={"/logo32.png"} alt="logo" />
        </Item>
        <div className={classes.toolbarTitle}></div>
        <Button
          variant="text"
          component={Link}
          to="/add-listing"
          className={classes.item}
          aria-label="ลงประกาศขายบ้าน"
        >
          {t("addinglist.name.label")}
        </Button>

        {props.currentUser ? (
          <React.Fragment>
            <Tooltip title={t("favoritebutton")}>
              <IconButton
                aria-label="add to favorites"
                component={Link}
                to="/my-favorite"
                className={classes.item}
                size="small"
              >
                <Badge
                  badgeContent={
                    props.currentUser.favorite === undefined
                      ? "0"
                      : props.currentUser.favorite.length
                  }
                  showZero
                  overlap="circle"
                  color="error"
                >
                  <FavoriteBorderRoundedIcon
                    style={{ fontSize: 27 }}
                    color="inherit"
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("accountbutton")}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                size="small"
                className={classes.item}
                aria-label="Avatar"
              >
                <Detector
                  render={({ online }) => (
                    <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                      color={online ? "secondary" : "error"}
                    >
                      <Avatar
                        src={props.currentUser.photoURL}
                        className={classes.avatar}
                      ></Avatar>
                    </StyledBadge>
                  )}
                />
              </IconButton>
            </Tooltip>
            <Menu
              id="lock"
              anchorEl={anchorE2}
              open={Boolean(anchorE2)}
              onClose={handleClose2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem
                component={Link}
                to="/profile"
                onClick={() => setAnchorE2(null)}
              >
                <AccountBoxOutlinedIcon className={classes.icon} />
                <Typography variant="inherit" noWrap>
                  {t("myaccount.name.label")}
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/my-house"
                onClick={() => setAnchorE2(null)}
              >
                <ListAltIcon className={classes.icon} />
                <Typography variant="inherit" noWrap>
                  {t("myhouse.name.label")}
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => signout()}>
                <ExitToAppIcon className={classes.icon} />
                <Typography variant="inherit" noWrap>
                  {t("signout.name.label")}
                </Typography>
              </MenuItem>
            </Menu>
          </React.Fragment>
        ) : (
          <Button
            variant="text"
            component={Link}
            to="/signin"
            aria-label="signin"
            className={classes.item}
          >
            {t("login.label")}
          </Button>
        )}
        <Tooltip title={t("langbutton")}>
          <Button
            aria-controls={Boolean(anchorEl) ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.item}
          >
            <ReactCountryFlag
              countryCode={i18n.language}
              svg
              style={{
                width: "2em",
                height: "2em",
              }}
              className={classes.item}
              alt="flags"
            />

            {options[selectedIndex]}
          </Button>
        </Tooltip>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              <ReactCountryFlag
                countryCode={langoptions[index]}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                className={classes.item}
              />
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Header);
