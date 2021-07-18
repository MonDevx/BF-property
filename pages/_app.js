import "../styles/globals.css";
import App from "next/app";
import { Provider } from "react-redux";
import React from "react";
import { reduxStore } from "../redux/store/store";
import { reduxPersistor } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { appWithTranslation } from "next-i18next";
import theme from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "../components/layouts/Layout";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "../components/alert/alert.component.jsx";
import dynamic from "next/dynamic";
import withRedux from "next-redux-wrapper";
const Pace = dynamic(
  () => {
    return import("../components/customs/pace/pace.js");
  },
  { ssr: false }
);
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    const options = {
      timeout: 10000,
    };
    return (
      <React.Fragment>
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={reduxPersistor}>
            <ThemeProvider theme={theme}>
              <Pace color={theme.palette.primary.main} />
              <AlertProvider template={AlertTemplate} {...options}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AlertProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </React.Fragment>
    );
  }
}

export default appWithTranslation(MyApp);
