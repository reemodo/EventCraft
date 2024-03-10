import React, { useEffect, useState } from "react";
import { useAuthHelpers } from "../useAuthHelpers/useAuthHelpers";

import { redirect } from "react-router-dom";

const Auth = (WrappedComponent) => {
  const Component = (props) => {
    const { isUserLoggedIn } = useAuthHelpers();

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      setLoggedIn(isUserLoggedIn());
    }, [isUserLoggedIn]);

    if (!loggedIn) {
      return redirect("/");
    }

    return <WrappedComponent />;
  };
  return <Component />;
};

export default Auth;
