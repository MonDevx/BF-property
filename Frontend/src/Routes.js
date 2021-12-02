import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route
        path="/signin"
        render={() =>
          props.currentUser ? <Redirect to="/" /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/add-listing"
        render={() =>
          props.currentUser ? <AddListingPage /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/property-edit"
        render={() =>
          props.currentUser ? <EditPropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route path="/property-detail/:name" component={PropertyDetailPage} />
      <Route exact path="/termsandcondition" component={TermsPage} />
      <Route
        path="/property-updatestatus"
        render={() =>
          props.currentUser ? <UpdateStatusPage /> : <SigninandSignupPage />
        }
      />
      <Route path="/seach-result" component={SeachResultPage} />
      <Route
        path="/my-favorite"
        render={() =>
          props.currentUser ? <FavoritePropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/profile"
        render={({ match: { url } }) =>
          props.currentUser ? (
            <React.Fragment>
              <Route path={`${url}`} component={ProfilePage} exact />
              <Route path={`${url}/edit-profile`} component={EditProfilePage} />
              <Route
                path={`${url}/changepassword`}
                component={ChangePasswordPage}
              />
            </React.Fragment>
          ) : (
            <SigninandSignupPage />
          )
        }
      />
      <Route path={`/resetpassword`} component={ResetPasswordPage} />
      <Route
        path="/my-property"
        render={() =>
          props.currentUser ? <MyPropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
