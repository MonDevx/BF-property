import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavigationDrawer from "../../components/customs/ืnavigationdrawer/navigationdrawer.js";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import Tooltip from "@mui/material/Tooltip";
import React, { useState, useCallback } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { Detector } from "react-detect-offline";
import Hidden from "@mui/material/Hidden";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AiOutlineAppstoreAdd,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineLogout,
  AiOutlineHeart,
} from "react-icons/ai";
import { FcMoneyTransfer } from "react-icons/fc";
import { setI18n } from "../../redux/i18n/i18n.actions";
import { setCurrency } from "../../redux/currency/currency.actions";
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
    display: "flex",
    justifyContent: "space-between",
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
  brandText: {
    fontWeight: 800,
  },
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
  },
}));
/* TODO  CHAGNE UI NAVBAR MOBILE AND ADD BUTTON CHAGNE LANGUAGES SIDEBAR */
function Header(props) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [anchorE2, setAnchorE2] = React.useState(false);
  const [anchorE3, setAnchorE3] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(
    i18n.language === "gb" ? 0 : i18n.language === "th" ? 1 : 2
  );
  const [selectedIndexCurrency, setSelectedIndexCurrency] = React.useState(
    props.currency === "gb" ? 0 : props.currency === "th" ? 1 : 2
  );

  const options = [
    t("menu.lang.en.label"),
    t("menu.lang.th.label"),
    t("menu.lang.ch.label"),
  ];
  const optionsCurrency = [t("dollar.label"), t("bath.label"), t("yuan.label")];
  const langoptions = ["gb", "th", "cn"];

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    i18n.changeLanguage(langoptions[index]);
    props.setI18n(langoptions[index]);
    setAnchorEl(null);
  };
  const handleMenuItemClickCurrency = (event, index) => {
    props.setCurrency(langoptions[index]);
    setSelectedIndexCurrency(index);
    setAnchorE3(null);
  };
  const signout = () => {
    setAnchorE2(null);
    auth.signOut().then(() => {
      window.location.reload();
    });
  };
  const handleClick = (event) => {
    if (event.currentTarget.id === "lang-menu") {
      setAnchorEl(event.currentTarget);
    } else if (event.currentTarget.id === "account-menu") {
      setAnchorE2(event.currentTarget);
    } else {
      setAnchorE3(event.currentTarget);
    }

  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
    setAnchorE3(null);
  };

  const classes = useStyles();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);
  const [selectedTab, setSelectedTab] = useState(null);
  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);
  const menuItems = [
    {
      status: true,
      link: "/",
      name: t("firstpage.name.label"),
      icon: <AiOutlineHome className="text-white" className={classes.icon} />,
    },
    {
      status: props.currentUser ? true : false,
      link: "/profile",
      name: t("myaccount.name.label"),
      icon: <AiOutlineUser className="text-white" className={classes.icon} />,
    },
    {
      status: true,
      link: "/add-listing",
      name: t("addinglist.name.label"),
      icon: (
        <AiOutlineAppstoreAdd className="text-white" className={classes.icon} />
      ),
    },
    {
      status: true,
      link: "/my-favorite",
      name: t("favoritebutton"),
      icon: <AiOutlineHeart className="text-white" className={classes.icon} />,
    },
    {
      status: props.currentUser ? true : false,
      link: "/my-property",
      name: t("myproperty.name.label"),
      icon: (
        <AiOutlineUnorderedList
          className="text-white"
          className={classes.icon}
        />
      ),
    },
    {
      status: props.currentUser ? false : true,
      link: "/signin",
      name: t("login.label"),
      icon: <AiOutlineLogout className="text-white" className={classes.icon} />,
    },
    {
      status: props.currentUser ? true : false,
      name: t("signout.name.label"),
      onClick: signout,
      icon: <AiOutlineLogout className="text-white" className={classes.icon} />,
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} color="inherit">
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="primary"
            >
              BFproperty
            </Typography>
          </div>
          <div>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
                size="large">
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden mdDown>
              <Button
                variant="text"
                component={Link}
                to="/"
                className={classes.item}
                aria-label="ลงประกาศขายบ้าน"
              >
                {t("firstpage.name.label")}
              </Button>
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
                        overlap="circular"
                        color="error"
                      >
                        <AiOutlineHeart
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
                      onClick={handleClick}
                      size="small"
                      className={classes.item}
                      aria-label="Avatar"
                      id="account-menu"
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
                    id="account-menu"
                    anchorEl={anchorE2}
                    open={Boolean(anchorE2)}
                    onClose={handleClose}
                    keepMounted

                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={() => setAnchorE2(null)}
                    >
                      <AiOutlineUser className={classes.icon} />
                      <Typography variant="inherit" noWrap>
                        {t("myaccount.name.label")}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/my-property"
                      onClick={() => setAnchorE2(null)}
                    >
                      <AiOutlineUnorderedList className={classes.icon} />
                      <Typography variant="inherit" noWrap>
                        {t("myproperty.name.label")}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => signout()}>
                      <AiOutlineLogout className={classes.icon} />
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
              <Tooltip title={t("tiptoolcurrency.label")}>
                <Button
                  id="currency-menu"
                  aria-controls={
                    Boolean(anchorE3) ? "menu-list-grow" : undefined
                  }
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.item}
                  startIcon={
                    <FcMoneyTransfer
                      style={{
                        width: "1.3em",
                        height: "1.3em",
                      }}
                    />
                  }
                >
                  {optionsCurrency[selectedIndexCurrency]}
                </Button>
              </Tooltip>
              <Menu
                id="currency-menu"
                anchorEl={anchorE3}

                open={Boolean(anchorE3)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {optionsCurrency.map((option, index) => (
                  <MenuItem
                    id="currency-menu"
                    key={option}
                    selected={index === selectedIndexCurrency}
                    onClick={(event) =>
                      handleMenuItemClickCurrency(event, index)
                    }
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
              <Tooltip title={t("langbutton")}>
                <Button
                  id="lang-menu"
                  aria-controls={
                    Boolean(anchorE3) ? "menu-list-grow" : undefined
                  }
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.item}
                >
                  <ReactCountryFlag
                    countryCode={i18n.language}
                    svg
                    style={{
                      width: "1.7em",
                      height: "1.7em",
                    }}
                    className={classes.item}
                    alt="flags"
                  />

                  {options[selectedIndex]}
                </Button>
              </Tooltip>
              <Menu
                id="lang-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {options.map((option, index) => (
                  <MenuItem
                    id="lang-menu"
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
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        currentuser={props.currentUser}
        menuItems={menuItems}
        anchor="right"
        open={isMobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currency: state.currency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  setI18n: (lang) => dispatch(setI18n(lang)),
  setCurrency: (currency) => dispatch(setCurrency(currency)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
