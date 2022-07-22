import React from 'react';
import './LoadingScreen.css';
import { useState } from 'react';
import BarLoader from 'react-spinners/HashLoader';

function LoadingScreen() {
	let [color, setColor] = useState('#4ba3c3');

	return (
		<div className="LoadingScreenContainer">
			<BarLoader color={color} size={50} />
			<h3>Just a second...</h3>
		</div>
	);
}

export default LoadingScreen;
