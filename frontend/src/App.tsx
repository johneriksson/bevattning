import React from "react";
import {
	Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import { useLogoutMutation } from "./generated/graphql";
import { useUser } from "./hooks/useUser";
import ChangePassword from "./pages/ChangePassword";

import Plants from "./pages/Plants";
import { CreatePlant } from "./pages/CreatePlant";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import history from "./utils/history";

import "./App.css";
import "./FormPage.css";

function App() {
	const [user, setUser] = useUser();
	const [, logout] = useLogoutMutation();

	console.log("user", user);
	return (
		<Router history={history}>
			<div className="App">
				<header className="App-header">
					<div>
						<h1>HemKit 🍐</h1>
					</div>
					<div>
						<Link to="/">Plants</Link>
						{user?.username && (
							<>
								{/* <Link to="/create-plant">Create plant</Link> */}
								<Link
									to="/"
									onClick={async (e) => {
										e.preventDefault();
										await logout();
										setUser(null);
									}}
								>
									Logout
								</Link>
								<span className="username">{user.username}</span>
							</>
						)}
						{!user?.username && (
							<>
								<Link to="/login">Login</Link>
								<Link to="/register">Register</Link>
							</>
						)}
					</div>
				</header>
				<div className="App-main">
					<Switch>
						<Route path="/" exact={true}>
							<Plants />
						</Route>

						<Route path="/create-plant">
							<CreatePlant />
						</Route>
						
						<Route path="/register">
							<Register />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/forgot-password">
							<ForgotPassword />
						</Route>
						<Route path="/change-password/:token">
							<ChangePassword />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
