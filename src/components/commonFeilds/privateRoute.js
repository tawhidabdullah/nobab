import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (!auth.order.isLoading) {
      if (auth.isAuthenticate) {
        setIsAuth(false);
      }
    }

    console.log('auth');
  }, [auth]);
  return (
    <Route
      {...rest}
      render={props => {
        return <Component {...rest} />;
      }}
    />
  );
};
const mapStateToProp = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProp)(PrivateRoute);
