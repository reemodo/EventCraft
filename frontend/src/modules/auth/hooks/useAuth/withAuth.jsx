import React, { useEffect, useState } from "react";
import { useAuthHelpers } from "../useAuthHelpers/useAuthHelpers";

import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const Component = (props) => {
    const { isUserLoggedIn } = useAuthHelpers();

    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
      (async () => {
        const isLoggedIn = isUserLoggedIn();

        setLoggedIn(!!isLoggedIn);
      })();
    }, [isUserLoggedIn]);

    if (!loggedIn) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };
  return <Component />;
};

export default withAuth;
