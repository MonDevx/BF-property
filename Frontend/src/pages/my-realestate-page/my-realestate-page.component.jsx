import Container from "@material-ui/core/Container";
import React, { useState, useEffect } from "react";
import Listrealestate from "../../components/list-realestate/list-realestate.component.jsx";
import axios from "axios";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { useAlert } from "react-alert";
import { Redirect } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

function MyhousePage() {
  const alert = useAlert();
  const [property, setProperty] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        if (cancelled) return;
        axios({
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          url: "https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/myrealestatelist",
          method: "GET",
        })
          .then((result) => {
            if (!cancelled) {
              setProperty(result.data);
              setIsLoading(false);
            }
          })
          .catch((error) => {
            alert.error(error.toString());
          });
      })
      .catch((error) => {
        alert.error(error.toString());
        if (!cancelled) setRedirect("/");
      });
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  if (isLoading) {
    return (
      <div style={{ margin: "50%" }}>
        <LoaderSpinners />
      </div>
    );
  }
  return (
    <Container
      maxWidth="lg"
      style={{ paddingTop: "2%", paddingBottom: "2%" }}
    >
      <Listrealestate property={property} />
    </Container>
  );
}

export default MyhousePage;
