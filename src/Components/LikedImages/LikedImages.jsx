import React from 'react';
import Menubar from '../Menubar/Menubar';
import Nav from '../Navbar/Nav';
import Fab from '../Fab/Fab';

function LikedImages() {
	return (
		<div className="LikedImagesContainer">
			<Nav />
			<h2>Liked Images</h2>
			<Fab />
		</div>
	);
}

export default LikedImages;
