import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "store";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "views/styles/global";
import theme from "views/styles/theme";

import AuthLayout from "layouts/Auth";
import DashboardLayout from "layouts/Dashboard";


// URL Padrão
axios.defaults.baseURL = "http://localhost:8000";

// Rota privada
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <PrivateRoute path="/dashboard" component={DashboardLayout} />
          <Redirect to="/dashboard/home" />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
