import Typography from "@mui/material/Typography";
import React, { Suspense, lazy } from "react";
import { Provider as AlertProvider } from "react-alert";
import Announcement from "react-announcement";
import { LiveChatLoaderProvider, Messenger } from "react-live-chat-loader";
import { connect } from "react-redux";
import {
  Route
} from "react-router-dom";
import "./App.css";
import AlertTemplate from "./components/alert/alert.component.jsx";
import Pace from "./components/customs/pace/pace.js";
import "./configuration/i18n";
import {
  auth,
  createUserProfileDocument,
  databaserealtime,
} from "./firebase/firebase.utils";
import { Scrollbars } from 'react-custom-scrollbars';
import { MaintancePage } from "./pages";
import { setCurrentUser } from "./redux/user/user.actions";
import { setI18n } from "./redux/i18n/i18n.actions";

import theme from "./theme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "./components/scroll-top/scroll-top.component.jsx";
import LoaderSpinners from "./components/loader-spinners/loader-spinners.jsx";
import { withTranslation } from "react-i18next";
import loadable from "react-loadable";
import { Footer, Header } from "./layouts";

import Router from "./Router";
const options = {
  timeout: 3000,
};
class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromAnnounceText = null;
  unsubscribeFromMaintenanceStatus = null;

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
      if (snapshot.val() === 1) {
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
    this.props.i18n.changeLanguage(this.props.lang);

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

      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Pace color={theme.palette.primary.main} />

          <AlertProvider template={AlertTemplate} {...options}>
            {this.state.maintenancestatus === 1 ? (
              <Suspense
                fallback={
                  <div align="center" style={{ margin: "21.80%" }}>
                    <LoaderSpinners />
                  </div>
                }
              >

                <div id="back-to-top-anchor"></div>

                <Header />
                <Router currentUser={this.props.currentUser} />
                <Footer />

                <Announcement
                  title={
                    <Typography variant="h5" gutterBottom>
                      {"ประกาศจากทางเว็ปไซต์"}
                    </Typography>
                  }
                  subtitle={
                    <Typography variant="subtitle2" gutterBottom>
                      {this.state.announcementtext}
                    </Typography>
                  }
                  imageSource="https://firebasestorage.googleapis.com/v0/b/bfproperty.appspot.com/o/logo-small.png?alt=media&token=df545452-df29-4696-b1ab-2df5c120eb36"
                  // daysToLive={this.state.day}
                  secondsBeforeBannerShows={3}
                  closeIconSize={10}
                />
                {/* <ScrollTop>
                  <Fab
                    color="secondary"
                    size="small"
                    aria-label="scroll back to top"
                  >
                    <KeyboardArrowUpIcon />
                  </Fab>
                </ScrollTop> */}

                <LiveChatLoaderProvider
                  provider="messenger"
                  providerKey="103720534694768"
                  appID="232462984487271"
                  locale="th_TH"
                >
                  <Messenger />
                </LiveChatLoaderProvider>
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
      </StyledEngineProvider>

    );
  }
}

const mapStateToProps = ({ user, language }) => ({
  currentUser: user.currentUser,
  lang: language.lang,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setI18n: (lang) => dispatch(setI18n(lang)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(App));
