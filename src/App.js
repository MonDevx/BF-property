import Typography from "@material-ui/core/Typography";
import { instanceOf } from "prop-types";
import React, { lazy, Suspense } from "react";
import { Provider as AlertProvider } from "react-alert";
import Announcement from "react-announcement";
import { Cookies, withCookies } from "react-cookie";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import "./App.css";
import AlertTemplate from "./components/alert/alert.component.jsx";
import { compose } from "redux";
import Pace from "./components/customs/pace/pace.js";
import "./configuration/i18n";
import {
  auth,
  createUserProfileDocument,
  databaserealtime,
} from "./firebase/firebase.utils";
import { Maintance as MaintancePage } from "./pages";
import { setCurrentUser } from "./redux/user/user.actions";
import Routes from "./Routes";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTop from "./components/scroll-top/scroll-top.component.jsx";
import LoaderSpinners from "./components/loader-spinners/loader-spinners";
const Footer = lazy(() => import("./layouts/footer/footer.component"));
const Header = lazy(() => import("./layouts/header/header.component"));
const options = {
  timeout: 3000,
};
class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromAnnounceText = null;
  unsubscribeFromMaintenanceStatus = null;
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      day: 3,
      announcementtext: "",
      maintenancestatus: null,
    };
  }
  getAnnounceText() {
    let announce = databaserealtime.ref("/announce/-M9xHq20T4kNe1dqJ9nC");
    announce.on("value", (snapshot) => {
      this.setState({
        announcementtext: snapshot.val().text,
        day: snapshot.val().day,
      });
    });
  }

  componentDidMount() {
    let app = databaserealtime.ref("/maintenance/maintenancestatus");
    app.on("value", (snapshot) => {
      this.setState({
        maintenancestatus: snapshot.val(),
      });
      if (snapshot.val()  === 1) {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
          this.setState({ currentUser: userAuth });
          if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth);
            userRef.onSnapshot((snapShot) => {
              this.props.setCurrentUser({
                id: snapShot.id,
                ...snapShot.data(),
              });
            });
          }
        });
      }
    });

    this.unsubscribeFromAnnounce = this.getAnnounceText();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth && this.unsubscribeFromAuth();
    this.unsubscribeFromAnnounce && this.unsubscribeFromMaintenanceStatus();
    this.unsubscribeFromAnnounce && this.unsubscribeFromAnnounce();
    this.unsubscribeFromAnnounce && this.getAnnounceText();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
         <Pace color={theme.palette.primary.main} />
        <AlertProvider template={AlertTemplate} {...options}>
          {this.state.maintenancestatus  === 1 ? (
            <Suspense
              fallback={
                <div align="center" style={{ margin: "21.80%" }}>
                  <LoaderSpinners />
                </div>
              }
            >
              {/* <CookieBanner /> */}
              <div id="back-to-top-anchor"></div>
              <Header />
              <Routes currentUser={this.props.currentUser} />
              <Footer />
              <Announcement
                title={
                  <Typography variant="h7" component="h2" gutterBottom>
                    {"ประกาศจากทางเว็ปไซต์"}
                  </Typography>
                }
                subtitle={
                  <Typography variant="subtitle2" gutterBottom>
                    {this.state.announcementtext}
                  </Typography>
                }
                imageSource="https://firebasestorage.googleapis.com/v0/b/bfproperty.appspot.com/o/logo-small.png?alt=media&token=df545452-df29-4696-b1ab-2df5c120eb36"
                daysToLive={this.state.day}
                secondsBeforeBannerShows={3}
                closeIconSize={10}
              />
              <ScrollTop>
                <Fab
                  color="secondary"
                  size="small"
                  aria-label="scroll back to top"
                >
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
              <MessengerCustomerChat
                pageId="103720534694768"
                appId="232462984487271"
                theme_color="#3b4aa7"
                language="th_TH"
              />
            </Suspense>
          ) : this.state.maintenancestatus === 0 ? (
            <Route path="/*" component={MaintancePage} />
          ) : (
            <div align="center" style={{ margin: "21.80%" }}>
              <LoaderSpinners />
            </div>
          )}
        </AlertProvider>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default compose(
  withCookies,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
