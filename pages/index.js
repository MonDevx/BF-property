import React from "react";
import axios from "axios";
import LoaderSpinners from "../components/loader-spinners/loader-spinners.jsx";
import { withAlert } from "react-alert";
import loadable from "react-loadable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from 'next-seo';
import { compose } from "redux";
import { withTranslation } from "next-i18next";
const Sectioncontry = loadable({
  loader: () =>
    import("../components/section/section-contry/section-contry.jsx"),
  loading: () => null,
});
const Sectionhowitwork = loadable({
  loader: () =>
    import(
      "../components/section/section-howitwork/section-howitwork.component.jsx"
    ),
  loading: () => null,
});
const Sectiontypeproperty = loadable({
  loader: () =>
    import(
      "../components/section/section-type-property/section-type-property.component.jsx"
    ),
  loading: () => null,
});
const Sectionhowto = loadable({
  loader: () =>
    import(
      "../components/section/section-howto/section-howto.component.jsx"
    ),
  loading: () => null,
});
const Sectionmain = loadable({
  loader: () =>
    import("../components/section/section-main/section-main.component.jsx"),
  loading: () => null,
});
const Sectionrecommend = loadable({
  loader: () =>
    import(
      "../components/section/section-recommend/section-recommend.component.jsx"
    ),
  loading: () => null,
});
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Property: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/realestaterecommendlist`
      )
      .then((result) => {
        this.setState({
          Property: result.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.props.alert.error(error.toString());
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading, Property } = this.state;
    const { t } = this.props;
    if (isLoading) {
      return (

        <React.Fragment>
          <NextSeo
            title={t("common:title-home")}
          />
          <Sectionmain />
          <main>
            <LoaderSpinners />
            <Sectionhowto />
            <Sectiontypeproperty />
            <Sectionhowitwork />
            <Sectioncontry />
          </main>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Sectionmain />
          <main>
            <Sectionrecommend property={Property} />
            <Sectionhowto />
            <Sectiontypeproperty />
            <Sectionhowitwork />
            <Sectioncontry />
          </main>
        </React.Fragment>
      );
    }
  }
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "header", "footer", "typeproperty", "seach-form", "main-section"
      , "list-realestate", "section-recommend", "section-howto", "typeproperty", "section-how-it-work", "section-contry"])),
  },
});

export default compose(
  withTranslation(),
  withAlert(),
)(Index);
