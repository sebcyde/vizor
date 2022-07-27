import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../Firebase/Firebase';
import './Register.css';
import { onAuthStateChanged } from 'firebase/auth';

function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [user, setUser] = useState();
	const [UserName, setUserName] = useState('');
	const navigate = useNavigate();

	const register = () => {
		registerWithEmailAndPassword(name, email, password, UserName);
		setUser(auth.currentUser);
	};

	// useEffect(() => {
	// 	console.log(user);
	// 	if (auth.currentUser !== null) navigate('/Homepage');
	// }, [user]);
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user !== null) {
				navigate('/Homepage');
			}
		});
	}, []);

	return (
		<div className="register">
			<div className="register__container">
				<input
					type="text"
					className="register__textBox"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Full Name"
				/>
				<input
					type="text"
					className="register__textBox"
					value={UserName}
					onChange={(e) => setUserName(e.target.value)}
					placeholder="UserName"
				/>
				<input
					type="text"
					className="register__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="E-mail Address"
				/>
				<input
					type="password"
					className="register__textBox"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button className="register__btn" onClick={register}>
					Register
				</button>
				<div>
					Already have an account? <Link to="/">Login</Link> now.
				</div>
			</div>
		</div>
	);
}
export default RegisterPage;
