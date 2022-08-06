import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Navbar/TopNav/Nav';
import Fab from '../Fab/Fab';
import { auth } from '../Firebase/Firebase';

function Favourites() {
	const user = auth;
	const navigate = useNavigate;

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				navigate('/');
			}
		});
	}, []);

	return (
		<div className="LibraryContainer">
			<Nav />
			<h2>Favourites</h2>
		</div>
	);
}

export default Favourites;
