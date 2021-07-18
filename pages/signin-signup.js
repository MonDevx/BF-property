import React from "react";
import SignIn from "../components/form-signin/form-signin.component.jsx";
import SignUp from "../components/form-signup/form-signup.component.jsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from 'next-seo';
import { useTranslation } from "next-i18next";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(10),
    },
  },
}));
export default function SignInAndSignUpPage() {
  const classes = useStyles();
  const { t } = useTranslation("common");
  return (
    <>
    <NextSeo
     title={t("title-signin-signup")}
   />
    <Container>
      <Paper className={classes.paper}>
        <SignIn />
        <SignUp />
      </Paper>
    </Container>
    </>
  );
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common","signin-signup","header","footer","typeproperty"])),
  },
});
