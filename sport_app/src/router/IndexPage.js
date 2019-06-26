import React, { Fragment } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import Login from '../views/login/LoginPage';
import Layout from '../views/layout/Layout';


export default class IndexPage extends React.Component{
  render() {
    return (
      <Fragment>
        <Switch>
          <Redirect exact from={'/'} to={'/main'}/>
          <Route exact path="/main" component={Layout} />
          <Route path="/login" component={Login} />
        </Switch>
      </Fragment>
    );
  }
};
