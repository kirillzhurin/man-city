import React from 'react';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/auth-routes/PrivateRoute';
import PublicRoute from './components/auth-routes/PublicRoute';

import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
        <PublicRoute  {...props} restricted={true} exact component={SignIn} path="/signin" />
        <PublicRoute  {...props} restricted={false} exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;