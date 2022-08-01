import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Navbar/TopNav/Nav';
import Fab from '../Fab/Fab';
import { auth } from '../Firebase/Firebase';

function LikedImages() {
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
		<div className="LikedImagesContainer">
			<Nav />
			<h2>Liked Images</h2>
			<Fab />
		</div>
	);
}

export default LikedImages;
