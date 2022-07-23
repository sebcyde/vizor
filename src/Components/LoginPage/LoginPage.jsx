import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

import './Login.css';
function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState();
	const navigate = useNavigate();

	const Login = () => {
		logInWithEmailAndPassword(email, password);
		setUser(auth.currentUser);
	};

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				navigate('/');
			} else if (user !== null) {
				navigate('/Homepage');
			}
		});
	}, []);

	return (
		<div className="login LoginPageContainer">
			<div className="login__container">
				<input
					type="text"
					className="login__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email Address"
				/>
				<input
					type="password"
					className="login__textBox"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button className="login__btn" onClick={Login}>
					Login
				</button>
				<div>
					Don't have an account? <Link to="/register">Register</Link> now.
				</div>
			</div>
		</div>
	);
}
export default LoginPage;
