import Footer from "./footer/footer.component";
import Navbar from "./header/header.component";
import Head from "next/head";
import ScrollTop from "../scroll-top/scroll-top.component";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { LiveChatLoaderProvider, Messenger } from "react-live-chat-loader";
import React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from '../../redux/user/user.actions';
import {
  auth,
  createUserProfileDocument,
  databaserealtime,
} from "../../firebase.utils";
class Layout extends React.Component {
  unsubscribeFromAuth = null;
  constructor(props) {
    super(props);
  }
  // getAnnounceText() {
  //   let announce = databaserealtime.ref("/announce/-M9xHq20T4kNe1dqJ9nC");
  //   announce.on("value", (snapshot) => {
  //     this.setState({
  //       announcementtext: snapshot.val().text,
  //       day: snapshot.val().day,
  //     });
  //   });
  // }

  componentDidMount() {
    // let app = databaserealtime.ref("/maintenance/maintenancestatus");

    // app.on("value", (snapshot) => {
    //   this.setState({
    //     maintenancestatus: snapshot.val(),
    //   });
    //   if (snapshot.val() === 1) {
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
    //   }
    // });
    // this.props.i18n.changeLanguage(this.props.lang);

    // this.unsubscribeFromAnnounce = this.getAnnounceText();
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth && this.unsubscribeFromAuth();
    // this.unsubscribeFromAnnounce && this.unsubscribeFromMaintenanceStatus();
    // this.unsubscribeFromAnnounce && this.unsubscribeFromAnnounce();
    // this.unsubscribeFromAnnounce && this.getAnnounceText();
  }
  render() {
    return (
      <div>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div id="back-to-top-anchor"></div>
        {this.props.children}
        <Footer />
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
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
      </div>
    );
  }
}
function mapStateToProps(user, language) {
  return {
    currentUser: user.currentUser,
    lang: language.lang
  }
};

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Layout);

