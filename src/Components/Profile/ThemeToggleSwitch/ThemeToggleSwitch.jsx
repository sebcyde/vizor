import React, { useEffect, useState } from 'react';
import { Switch } from 'react-materialize';

function ThemeToggleSwitch() {
	const [toggle, setToggle] = useState(false);
	const [AppTheme, setAppTheme] = useState();

	// Switches Color Theme
	const SwitchTheme = () => {
		console.log('Switch Theme Activated');
		if (AppTheme === 'LightMode') {
			setAppTheme('Dark');
		} else if (AppTheme === 'Dark') {
			setAppTheme('LightMode');
		}
		console.log(`App Theme is now: ${AppTheme}`);
	};

	// Stores and Applies Color Theme To Body
	useEffect(() => {
		if (AppTheme !== undefined) {
			window.localStorage.setItem('AppColorScheme', AppTheme);
			console.log(`Stored Theme is now ${AppTheme}`);

			let color = window.localStorage.getItem('AppColorScheme');

			// Applying Theme
			const Body = document.body;
			if (color === 'LightMode') {
				setAppTheme('LightMode');
			} else if (color === 'Dark') {
				setAppTheme('Dark');
			}
			if (Body.classList.contains('Dark')) {
				Body.classList.remove('Dark');
			} else if (Body.classList.contains('LightMode')) {
				Body.classList.remove('LightMode');
			}

			if (Body.classList.contains('undefined')) {
				Body.classList.remove('undefined');
			}

			if (color !== undefined) {
				Body.classList.add(AppTheme);
			}
		} else {
			setAppTheme(window.localStorage.getItem('AppColorScheme'));
		}
	}, [AppTheme]);

	useEffect(() => {
		// check when the component is loaded
		const localStorageToggled = localStorage.getItem('toggled');

		// If is not null
		if (localStorageToggled) {
			setToggle(localStorageToggled === 'true' ? true : false);
		} else {
			// If null set the localStorage key/value as a string.
			localStorage.setItem('toggle', `${toggle}`);
		}
		console.log(localStorage);
	}, []);

	const handleToggle = (toggle) => {
		localStorage.setItem('toggle', `${toggle}`);
		setToggle(toggle);
	};
	return (
		<Switch
			onChange={() => {
				SwitchTheme();
				handleToggle(!toggle);
			}}
			offLabel="Light"
			onLabel="Dark"
		/>
	);
}

export default ThemeToggleSwitch;
