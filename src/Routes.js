import React from 'react';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/auth-routes/PrivateRoute';
import PublicRoute from './components/auth-routes/PublicRoute';

import Home from './components/home';
import Team from './components/team';
import Matches from './components/matches';
import SignIn from './components/signin';
import NotFound from './components/ui/NotFound';

import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/AddEditMatch';
import AdminPlayers from './components/admin/players';
import AddEditPlayer from './components/admin/players/AddEditPlayer';


const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
        <PrivateRoute {...props} path="/admin/matches" exact component={AdminMatches} />
        <PrivateRoute {...props} path="/admin/add/match" exact component={AddEditMatch} />
        <PrivateRoute {...props} path="/admin/edit/match/:id" exact component={AddEditMatch} />
        <PrivateRoute {...props} path="/admin/players" exact component={AdminPlayers} />
        <PrivateRoute {...props} path="/admin/edit/player/:id" exact component={AddEditPlayer} />
        <PrivateRoute {...props} path="/admin/add/player" exact component={AddEditPlayer} />
        <PublicRoute  {...props} restricted={true} exact component={SignIn} path="/signin" />
        <PublicRoute  {...props} restricted={false} exact component={Team} path="/team" />
        <PublicRoute  {...props} restricted={false} exact component={Matches} path="/matches" />
        <PublicRoute  {...props} restricted={false} exact component={Home} path="/" />
        <PublicRoute  {...props} restricted={false} component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;