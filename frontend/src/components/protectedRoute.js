import React from "react";
import { Route, Redirect } from "react-router-dom";
import { env } from "../utils";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(env.KEY);
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/auth/login" }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
