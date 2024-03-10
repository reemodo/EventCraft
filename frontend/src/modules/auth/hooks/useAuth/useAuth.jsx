import React, { useEffect } from "react";
import { useAuthHelpers } from "../useAuthHelpers/useAuthHelpers";

import { redirect } from "react-router-dom";

const Auth = (WrappedComponent) => {
  const Component = (props) => {
    const { isUserLoggedIn } = useAuthHelpers();

    useEffect(() => {
      (() => {
        const isLoggedIn = isUserLoggedIn();
        if (!isLoggedIn) {
          redirect("/");
        }
      })();
    }, [isUserLoggedIn]);

    return <WrappedComponent />;
  };
  return <Component />;
};

export default Auth;
