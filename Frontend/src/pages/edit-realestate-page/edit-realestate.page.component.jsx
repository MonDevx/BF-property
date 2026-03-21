import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Editproperty from "../../components/edit-property/edit-property.component.jsx";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { auth } from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";

function EditpropertyPage() {
  const alert = useAlert();
  const location = useLocation();

  const [realestate, setRealestate] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let token = null;
      await auth.currentUser
        .getIdToken(/* forceRefresh */ true)
        .then((fetchedToken) => {
          token = fetchedToken;
        })
        .catch((error) => {
          alert.error(error.toString());
          setRedirect("/");
        });

      if (token) {
        axios({
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/editrealestatedetail/${location.state.id}`,
          method: "GET",
        })
          .then((result) => {
            setRealestate(result.data);
            setIsLoading(false);
          })
          .catch((error) => {
            alert.error(error.toString());
          });
      } else {
        setIsLoading(false);
        setRedirect("/");
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  if (isLoading) {
    return (
      <div style={{ margin: "100%" }}>
        <LoaderSpinners />
      </div>
    );
  }
  return <Editproperty property={realestate.data} id={realestate.id} />;
}

export default EditpropertyPage;
