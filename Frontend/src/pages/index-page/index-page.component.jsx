import React from "react";
import axios from "axios";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { withAlert } from "react-alert";
// const Sectioncontry = lazy(() => import("../../components/section/section-contry/section-contry.jsx"));
// const Sectionhowitwork = lazy(() => import("../../components/section/section-howitwork/section-howitwork.component.jsx"));
// const Sectiontypeproperty = lazy(() => import("../../components/section/section-type-property/section-type-property.component.jsx"));
// const Sectionhowto = lazy(() => import("../../components/section/section-howto/section-howto.component.jsx"));
// const Sectionmain = lazy(() => import("../../components/section/section-main/section-main.component.jsx"));
// const Sectionrecommend = lazy(() => import("../../components/section/section-recommend/section-recommend.component.jsx"));
import loadable from "react-loadable";
const Sectioncontry = loadable({
  loader: () =>
    import("../../components/section/section-contry/section-contry.jsx"),
  loading: () => null,
});
const Sectionhowitwork = loadable({
  loader: () =>
    import(
      "../../components/section/section-howitwork/section-howitwork.component.jsx"
    ),
  loading: () => null,
});
const Sectiontypeproperty = loadable({
  loader: () =>
    import(
      "../../components/section/section-type-property/section-type-property.component.jsx"
    ),
  loading: () => null,
});
const Sectionhowto = loadable({
  loader: () =>
    import(
      "../../components/section/section-howto/section-howto.component.jsx"
    ),
  loading: () => null,
});
const Sectionmain = loadable({
  loader: () =>
    import("../../components/section/section-main/section-main.component.jsx"),
  loading: () => null,
});
const Sectionrecommend = loadable({
  loader: () =>
    import(
      "../../components/section/section-recommend/section-recommend.component.jsx"
    ),
  loading: () => null,
});
class HomePage extends React.Component {
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
    if (isLoading) {
      return (
        <div>
          <Sectionmain />
          <main>
            <LoaderSpinners />
            <Sectionhowto />
            <Sectiontypeproperty />
            <Sectionhowitwork />
            <Sectioncontry />
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <Sectionmain />
          <main>
            <Sectionrecommend property={Property} />
            <Sectionhowto />
            <Sectiontypeproperty />
            <Sectionhowitwork />
            <Sectioncontry />
          </main>
        </div>
      );
    }
  }
}
export default withAlert()(HomePage);
