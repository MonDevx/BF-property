import Typography from "@material-ui/core/Typography";
import React, { Suspense, useState, useEffect, useRef } from "react";
import { Provider as AlertProvider } from "react-alert";
import Announcement from "react-announcement";
import { LiveChatLoaderProvider, Messenger } from "react-live-chat-loader";
import { useSelector, useDispatch } from "react-redux";
import Route from "react-router-dom/Route";
import "./App.css";
import AlertTemplate from "./components/alert/alert.component.jsx";
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
import { ThemeProvider } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTop from "./components/scroll-top/scroll-top.component.jsx";
import LoaderSpinners from "./components/loader-spinners/loader-spinners.jsx";
import { useTranslation } from "react-i18next";
import loadable from "react-loadable";

const Footer = loadable({
  loader: () => import("./layouts/footer/footer.component.jsx"),
  loading: () => null,
});
const Header = loadable({
  loader: () => import("./layouts/header/header.component.jsx"),
  loading: () => null,
});

const options = {
  timeout: 3000,
};

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const lang = useSelector(({ language }) => language.lang);

  const [day, setDay] = useState(3);
  const [announcementtext, setAnnouncementtext] = useState("");
  const [maintenancestatus, setMaintenancestatus] = useState(null);

  const unsubscribeFromAuthRef = useRef(null);
  const userSnapshotUnsubscribeRef = useRef(null);
  const announceRef = useRef(null);
  const maintenanceRef = useRef(null);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    maintenanceRef.current = databaserealtime.ref("/maintenance/maintenancestatus");
    maintenanceRef.current.on("value", (snapshot) => {
      setMaintenancestatus(snapshot.val());
      if (snapshot.val() === 1 && !unsubscribeFromAuthRef.current) {
        unsubscribeFromAuthRef.current = auth.onAuthStateChanged(async (userAuth) => {
          if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth);
            userSnapshotUnsubscribeRef.current = userRef.onSnapshot((snapShot) => {
              dispatch(setCurrentUser({
                id: snapShot.id,
                ...snapShot.data(),
              }));
            });
          }
        });
      }
    });

    announceRef.current = databaserealtime.ref("/announce/-M9xHq20T4kNe1dqJ9nC");
    announceRef.current.on("value", (snapshot) => {
      setAnnouncementtext(snapshot.val().text);
      setDay(snapshot.val().day);
    });

    return () => {
      unsubscribeFromAuthRef.current && unsubscribeFromAuthRef.current();
      userSnapshotUnsubscribeRef.current && userSnapshotUnsubscribeRef.current();
      maintenanceRef.current && maintenanceRef.current.off();
      announceRef.current && announceRef.current.off();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider theme={theme}>
      <Pace color={theme.palette.primary.main} />
      <AlertProvider template={AlertTemplate} {...options}>
        {maintenancestatus === 1 ? (
          <Suspense
            fallback={
              <div align="center" style={{ margin: "21.80%" }}>
                <LoaderSpinners />
              </div>
            }
          >
            <div id="back-to-top-anchor"></div>
            <Header />
            <Routes currentUser={currentUser} />
            <Footer />
            <Announcement
              title={
                <Typography variant="h5" gutterBottom>
                  {"ประกาศจากทางเว็ปไซต์"}
                </Typography>
              }
              subtitle={
                <Typography variant="subtitle2" gutterBottom>
                  {announcementtext}
                </Typography>
              }
              imageSource="https://firebasestorage.googleapis.com/v0/b/bfproperty.appspot.com/o/logo-small.png?alt=media&token=df545452-df29-4696-b1ab-2df5c120eb36"
              // daysToLive={day}
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

            <LiveChatLoaderProvider
              provider="messenger"
              providerKey="103720534694768"
              appID="232462984487271"
              locale="th_TH"
            >
              <Messenger />
            </LiveChatLoaderProvider>
          </Suspense>
        ) : maintenancestatus === 0 ? (
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

export default App;
