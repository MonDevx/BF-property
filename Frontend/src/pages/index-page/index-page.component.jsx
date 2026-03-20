import React, { useState, useEffect } from "react";
import axios from "axios";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { useAlert } from "react-alert";
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

function HomePage() {
  const alert = useAlert();
  const [Property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/realestaterecommendlist`
      )
      .then((result) => {
        setProperty(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        alert.error(error.toString());
        setIsLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

export default HomePage;
