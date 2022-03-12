import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    IconButton,
    Typography,
    isWidthUp,
    Toolbar,
    Grid,
} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Detector } from "react-detect-offline";
import { useTranslation } from "react-i18next";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

const styles = (theme) => ({
    closeIcon: {},
    headSection: {
        width: 200,
    },
    blackList: {
        height: "100%",
    },
    noDecoration: {
        textDecoration: "none !important",
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
});
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
function NavigationDrawer(props) {
    const { t } = useTranslation();
    const {
        width,
        open,
        onClose,
        anchor,
        classes,
        menuItems,
        selectedItem,
        theme,
        currentuser,
    } = props;
    useEffect(() => {
        window.onresize = () => {
            if (isWidthUp("sm", width) && open) {
                onClose();
            }
        };
    }, [width, open, onClose]);

    return (
        <Drawer variant="temporary" open={open} onClose={onClose} anchor={anchor}>
            <Toolbar className={classes.headSection}>
                <ListItem
                    style={{
                        paddingTop: theme.spacing(0),
                        paddingBottom: theme.spacing(0),
                        height: "100%",
                        justifyContent: anchor === "left" ? "flex-start" : "flex-end",
                    }}
                    disableGutters
                >
                    <ListItemIcon className={classes.closeIcon}>
                        <IconButton onClick={onClose} aria-label="Close Navigation" size="large">
                            <CloseIcon color="primary" />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            </Toolbar>
            <List className={classes.blackList}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    {currentuser ? (
                        <React.Fragment>
                            <Grid item xs={12}>
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
                                                src={currentuser.photoURL}
                                                className={classes.avatar}
                                            ></Avatar>
                                        </StyledBadge>
                                    )}
                                    className={classes.detector}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" className="text-white">
                                    {t('welcome.label')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" className="text-white">
                                    {currentuser.displayName}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ) : null}
                </Grid>

                {menuItems.map((element) => {
                    if (element.link && element.status) {
                        return (
                            <Link
                                key={element.name}
                                to={element.link}
                                className={classes.noDecoration}
                                onClick={onClose}
                            >
                                <ListItem
                                    button
                                    selected={selectedItem === element.name}
                                    /**
                                     * We disable ripple as it will make a weird animation
                                     * with primary and secondary color
                                     */
                                    disableRipple
                                    disableTouchRipple
                                >
                                    <ListItemIcon>{element.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle2" className="text-white">
                                                {element.name}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </Link>
                        );
                    }
                    if (element.onClick && element.status) {
                        return (
                            <ListItem button key={element.name} onClick={element.onClick}>
                                <ListItemIcon>{element.icon}</ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" className="text-white">
                                            {element.name}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        );
                    }
                })}
            </List>
        </Drawer>
    );
}

NavigationDrawer.propTypes = {
    anchor: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    selectedItem: PropTypes.string,
    currentuser: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(NavigationDrawer)
);
