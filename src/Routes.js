import React from 'react';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/auth-routes/PrivateRoute';
import PublicRoute from './components/auth-routes/PublicRoute';

import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/AddEditMatch';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
        <PrivateRoute {...props} path="/admin/matches" exact component={AdminMatches} />
        <PrivateRoute {...props} path="/admin/add/match" exact component={AddEditMatch} />
        <PrivateRoute {...props} path="/admin/edit/match/:id" exact component={AddEditMatch} />
        <PublicRoute  {...props} restricted={true} exact component={SignIn} path="/signin" />
        <PublicRoute  {...props} restricted={false} exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;