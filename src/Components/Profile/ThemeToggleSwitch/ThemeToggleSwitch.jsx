import React, { useEffect, useState } from 'react';
import { Switch } from 'react-materialize';

function ThemeToggleSwitch() {
	const [toggle, setToggle] = useState(false);
	const [AppTheme, setAppTheme] = useState();

	// Switches Color Theme
	const SwitchTheme = () => {
		if (AppTheme === 'LightMode') {
			setAppTheme('Dark');
		} else if (AppTheme === 'Dark') {
			setAppTheme('LightMode');
		}
	};

	// Stores and Applies Color Theme To Body
	useEffect(() => {
		if (AppTheme !== undefined) {
			window.localStorage.setItem('AppColorScheme', AppTheme);

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
		let color = window.localStorage.getItem('AppColorScheme');

		// If is not null
		if (color == 'LightMode') {
			setToggle(false);
		} else if (color == 'Dark') {
			// If null set the localStorage key/value as a string.
			setToggle(true);
		} else {
			setToggle(false);
		}
	}, [SwitchTheme]);

	return (
		<Switch
			onChange={() => {
				SwitchTheme();
			}}
			offLabel="Light"
			onLabel="Dark"
			checked={toggle}
		/>
	);
}

export default ThemeToggleSwitch;
