import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdmin } from "../../redux/actions/authActions";
import classnames from "classnames";
import Bull from "../../assets/bull.png";
import "./auth.scss";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {},
		};
	}

	componentDidMount() {
		// If logged in and admin navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard"); // push admin to dashboard when they login
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		const adminData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginAdmin(adminData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
	};
	render() {
		const { errors } = this.state;
		return (
			<div id="loginBg">
				<div className="auth-title">
					<img src={Bull} className="auth-bull-img" alt="bull" />
					<span className="auth-text"> Bull Pen - Admin </span>

					<img
						src={Bull}
						className="auth-bull-img"
						alt="bull"
						style={{
							transform: "scaleX(-1)",
						}}
					/>
				</div>
				<div className="box">
					<form noValidate onSubmit={this.onSubmit} autoComplete="off">
						<div className="inputBox">
							<input
								autoComplete="off"
								required
								onChange={this.onChange}
								value={this.state.email}
								error={errors.email}
								id="email"
								type="email"
								className={classnames("", {
									invalid: errors.email || errors.emailnotfound,
								})}
							/>
							<label htmlFor="email">Email</label>
							<span className="red-text">
								{errors.email}
								{errors.emailnotfound}
							</span>
						</div>
						<div className="inputBox">
							<input
								required
								onChange={this.onChange}
								value={this.state.password}
								error={errors.password}
								id="password"
								type="password"
								className={classnames("", {
									invalid: errors.password || errors.passwordincorrect,
								})}
							/>
							<label htmlFor="password">Password</label>
							<span className="red-text">
								{errors.password}
								{errors.passwordincorrect}
							</span>
						</div>
						<div>
							<input type="submit" name="submit" value="Login" />
							<p>
								Don't have an account?{" "}
								<Link to="/register" className="auth-link">
									Register
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginAdmin: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { loginAdmin })(Login);
