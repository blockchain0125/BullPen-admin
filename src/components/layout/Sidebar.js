import React, { useState } from "react";
import { connect } from "react-redux";
import { logoutAdmin } from "../../redux/actions/authActions";
import "./sidebar.scss";
import Bull from "../../assets/bull.png";

const items = [
	{ title: "Dashboard", url: "/dashboard" },
	{ title: "Users", url: "/users_detail" },
	{ title: "Items", url: "/items" },
	{ title: "Requests", url: "/requests" },
	{ title: "User play data", url: "/users_play" },
];

const Sidebar = (props) => {
	const [selectedItem, setSelectedItem] = useState(window.location.href.substr(window.location.href.lastIndexOf("/")));

	const onLogoutClick = () => {
		props.logoutAdmin();
	};

	return (
		<div className="sidebar">
			<div className="sidebar-title">
				<div>
					<img src={Bull} className="sidebar-logo" alt="bull" />
					<img
						src={Bull}
						className="sidebar-logo"
						style={{
							transform: "scaleX(-1)",
						}}
						alt="bull"
					/>
				</div>
			</div>

			<div className="sidebar-items">
				{items.map((item) => {
					return selectedItem === item.url ? (
						<div className="sidebar-selected-item" key={item.url}>
							{item.title}
						</div>
					) : (
						<div
							className="sidebar-item"
							onClick={() => {
								setSelectedItem(item.url);
								props.history.push(item.url);
							}}
							key={item.url}
						>
							{item.title}
						</div>
					);
				})}
			</div>
			<div className="sidebar-logout" onClick={onLogoutClick}>
				Logout
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutAdmin })(Sidebar);
