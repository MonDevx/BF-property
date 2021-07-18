import React from "react";
import Restpassword from "../components/resetpassword/resetpasword.component.jsx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from 'next-seo';
import { useTranslation } from "next-i18next";

const RestpasswordPage = () => {
  const { t } = useTranslation("common");
  return (
    <React.Fragment>
      <NextSeo
        title={t("common:title-reset-password")}
      />
      <Restpassword />
    </React.Fragment>
  )
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "reset-password", "signin-signup", "header", "footer","typeproperty"])),
  },
});

export default RestpasswordPage;