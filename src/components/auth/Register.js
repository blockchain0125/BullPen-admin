import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdmin } from "../../redux/actions/authActions";
import classnames from "classnames";
import Bull from "../../assets/bull.png";
import "./auth.scss";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {},
		};
	}

	componentDidMount() {
		// If logged in and User navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
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
		const newAdmin = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};

		this.props.registerAdmin(newAdmin, this.props.history);
	};

	render() {
		const { errors } = this.state;
		return (
			<div id="registerBg">
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

				<div className="box mt-5">
					<form noValidate onSubmit={this.onSubmit} autoComplete="off">
						<div className="inputBox">
							<input autoComplete="off" required onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text" />
							<label htmlFor="name">Name</label>
							<span className="red-text">{errors.name}</span>
						</div>
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
									invalid: errors.email,
								})}
							/>
							<label htmlFor="email">Email</label>
							<span className="red-text">{errors.email}</span>
						</div>
						<div className="inputBox">
							<input
								autoComplete="off"
								required
								onChange={this.onChange}
								value={this.state.password}
								error={errors.password}
								id="password"
								type="password"
								className={classnames("", {
									invalid: errors.password,
								})}
							/>
							<label htmlFor="password">Password</label>
							<span className="red-text">{errors.password}</span>
						</div>
						<div className="inputBox">
							<input
								autoComplete="off"
								required
								onChange={this.onChange}
								value={this.state.password2}
								error={errors.password2}
								id="password2"
								type="password"
								className={classnames("", {
									invalid: errors.password2,
								})}
							/>
							<label htmlFor="password2">Confirm Password</label>
							<span className="red-text">{errors.password2}</span>
						</div>
						<div>
							<input type="submit" name="submit" value="Register" />

							<p>
								Already have an account?{" "}
								<Link to="/login" className="auth-link">
									Log in
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerAdmin: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerAdmin })(withRouter(Register));
