import React from 'react';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact component={Dashboard} path="/dashboard" />
        <Route exact component={SignIn} path="/signin" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;