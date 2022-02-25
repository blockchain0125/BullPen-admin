import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class Landing extends Component {
	render() {
		return <Redirect to="/login" />;
	}
}
export default Landing;
