import React from "react";
import {
	Router,
	Switch as RouterSwitch,
	Route,
	Link
} from "react-router-dom";

import { useLedQuery, useLogoutMutation, useSetLedMutation } from "./generated/graphql";
import { useUser } from "./hooks/useUser";
import ChangePassword from "./pages/ChangePassword";

import Plants from "./pages/Plants";
import { CreatePlant } from "./pages/CreatePlant";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import history from "./utils/history";
import Switch from "./components/Switch";
import { useLocalStorage } from "./hooks/useLocalStorage";

import "./App.css";
import "./FormPage.css";

function App() {
	const [user, setUser] = useUser();
	const [, logout] = useLogoutMutation();
	
	const [{ data: ledStatus }] = useLedQuery();
	const [, setLED] = useSetLedMutation();
	const ledOn = ledStatus?.led?.on;
	const ledLoaded = !!ledStatus;

	const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false);

	console.log("user", user);
	return (
		<Router history={history}>
			<div className={`App ${darkMode ? "dark" : "light"}`}>
				<header className="App-header">
					<div className="card-1">
						<h1>HemKit 🍐</h1>
					</div>
					<div className="card-1">
						<Switch
							title="LED"
							disabled={!ledLoaded}
							onClick={async () => {
								await setLED({ on: !ledOn });
							}}
							active={ledOn}
						/>
						<Switch
							title="Dark mode"
							onClick={async () => {
								await setDarkMode(!darkMode);
							}}
							active={darkMode}
						/>
					</div>
					<div className="card-1">
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
					<RouterSwitch>
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
					</RouterSwitch>
				</div>
			</div>
		</Router>
	);
}

export default App;
