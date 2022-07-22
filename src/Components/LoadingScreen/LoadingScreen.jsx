import React from 'react';
import './LoadingScreen.css';
import { useState } from 'react';
import BarLoader from 'react-spinners/HashLoader';

function LoadingScreen() {
	let [color, setColor] = useState('#7d82b8');

	return (
		<div className="LoadingScreenContainer">
			<BarLoader color={color} size={50} />
			<h3 className="LoadingScreenText">Just a second...</h3>
		</div>
	);
}

export default LoadingScreen;
