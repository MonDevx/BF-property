import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  Addlisting as AddlistingPage,
  Changepassword as ChangepasswordPage,
  Editprofile as EditprofilePage,
  Editproperty as EditpropertyPage,
  Favoriteproperty as FavoritepropertyPage,
  Index as IndexPage,
  Myproperty as MypropertyPage,
  Notfound as NotfoundPage,
  Profile as ProfilePage,
  Propertydetail as PropertydetailPage,
  Resetpassword as ResetpasswordPage,
  Seachresult as SeachresultPage,
  SigninandSignup as SigninandSignupPage,
  Terms as TermsPage,
  Updatestatus as UpdatestatusPage,
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
          props.currentUser ? <AddlistingPage /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/property-edit"
        render={() =>
          props.currentUser ? <EditpropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route path="/property-detail/:name" component={PropertydetailPage} />
      <Route path="/termsandcondition" component={TermsPage} />
      <Route
        path="/property-updatestatus"
        render={() =>
          props.currentUser ? <UpdatestatusPage /> : <SigninandSignupPage />
        }
      />
      <Route path="/seach-result" component={SeachresultPage} />
      <Route
        path="/my-favorite"
        render={() =>
          props.currentUser ? <FavoritepropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/profile"
        render={({ match: { url } }) =>
          props.currentUser ? (
            <React.Fragment>
              <Route path={`${url}`} component={ProfilePage} exact />
              <Route path={`${url}/edit-profile`} component={EditprofilePage} />
              <Route
                path={`${url}/changepassword`}
                component={ChangepasswordPage}
              />
            </React.Fragment>
          ) : (
            <SigninandSignupPage />
          )
        }
      />
      <Route path={`/resetpassword`} component={ResetpasswordPage} />
      <Route
        path="/my-property"
        render={() =>
          props.currentUser ? <MypropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route path="*" component={NotfoundPage} />
    </Switch>
  );
};

export default Routes;
