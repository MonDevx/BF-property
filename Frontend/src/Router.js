import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoaderSpinners from "./components/loader-spinners/loader-spinners.jsx";
import loadable from "react-loadable";
import {
  AddListingPage,
  ChangePasswordPage,
  EditProfilePage,
  EditPropertyPage,
  FavoritePropertyPage,
  IndexPage,
  MaintancePage,
  MyPropertyPage,
  NotFoundPage,
  ProfilePage,
  PropertyDetailPage,
  ResetPasswordPage,
  SeachResultPage,
  SigninandSignupPage,
  TermsPage,
  UpdateStatusPage,
} from "./pages";

const Router = (props) => {
  return (
    <Routes>
      <Route path="/" index element={<IndexPage />} />
      <Route
        path="/signin"
        element={
          props.currentUser ? <Navigate to="/" replace /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/add-listing"
        element={
          props.currentUser ? <AddListingPage /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/property-edit"
        element={
          props.currentUser ? <EditPropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route path="/property-detail/:name" element={<PropertyDetailPage />} />
      <Route exact path="/termsandcondition" element={<TermsPage />} />
      <Route
        path="/property-updatestatus"
        element={
          props.currentUser ? <UpdateStatusPage /> : <SigninandSignupPage />
        }
      />
      <Route path="/seach-result" element={<SeachResultPage />} />
      <Route
        path="/my-favorite"
        element={
          props.currentUser ? <FavoritePropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/profile"
        element={({ match: { url } }) =>
          props.currentUser ? (
            <React.Fragment>
              <Route path={`${url}`} element={<ProfilePage />} exact />
              <Route path={`${url}/edit-profile`} element={<EditProfilePage />} />
              <Route
                path={`${url}/changepassword`}
                element={<ChangePasswordPage />}
              />
            </React.Fragment>
          ) : (
            <SigninandSignupPage />
          )
        }
      />
      <Route path={`/resetpassword`} element={<ResetPasswordPage />} />
      <Route
        path="/my-property"
        element={
          props.currentUser ? <MyPropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
