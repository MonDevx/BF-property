// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { auth } from "../../firebase.utils";
const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      let jwtToken = auth.onAuthStateChanged(function (user) {
        if (user) {
          user.getIdToken().then(function (idToken) {
            return idToken;
          });
        }else{
          return null;
        }
      });
      
      console.log(jwtToken);
      // If there is no access token we redirect to "/" page.
      if (!jwtToken) {
        Router.replace("/signin-signup");
        return null;
      } else {
        return <WrappedComponent {...props} />;
      }
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
