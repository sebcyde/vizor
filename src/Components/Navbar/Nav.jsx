import React from 'react';
import { Navbar, Icon, NavItem } from 'react-materialize';
import Vlogo from '../../Assets/VLogo.ico';

function Nav() {
	return (
		<nav className="NavbarContainer">
			<a className="brand-logo left">
				<img src={Vlogo} className="NavbarLogo" />
			</a>

			<span class="material-symbols-outlined NavDMButton">send</span>
		</nav>
	);
}

export default Nav;
