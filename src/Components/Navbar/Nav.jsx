import React from 'react';
import { Navbar, Icon, NavItem } from 'react-materialize';
import Vlogo from '../../Assets/VLogo.ico';

function Nav() {
	return (
		<nav className="NavbarContainer">
			{
				<a className="brand-logo left">
					<img src={Vlogo} className="NavbarLogo" />
				</a>
			}
		</nav>
	);
}

export default Nav;
