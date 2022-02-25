import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/utils/setAuthToken";
import { setCurrentAdmin, logoutAdmin } from "./redux/actions/authActions";

import { Provider } from "react-redux";
import store from "./redux/store";

import Landing from "./components/layout/Landing";
import Sidebar from "./components/layout/Sidebar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/common/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashoard";

// Check for token to keep admin logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get admin info and exp
	const decoded = jwt_decode(token);
	// Set admin and isAuthenticated
	store.dispatch(setCurrentAdmin(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout admin
		store.dispatch(logoutAdmin());
		// Redirect to login
		window.location.href = "./login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route exact path="/" component={Landing} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute component={Sidebar} />
					<Switch>
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
