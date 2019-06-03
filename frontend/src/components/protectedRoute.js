/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { env } from '../utils';

const ProtectedRoute = ({
  component: Component,
  user,
  updateUser,
  onChangeUpdate,
  ...rest
}) => {
  const token = localStorage.getItem(env.KEY);
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component
            {...props}
            user={user}
            updateUser={updateUser}
            onChangeUpdate={onChangeUpdate}
          />
        ) : (
          <Redirect to={{ pathname: '/auth/login' }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
