import React from 'react';
import { Navbar, Icon, NavItem } from 'react-materialize';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Vlogo from '../../../Assets/VLogo.ico';

function Nav() {
	let location = useLocation();

	// Span will navigate to DMs Page
	return (
		<nav className="NavbarContainer">
			<a className="brand-logo left">
				<img src={Vlogo} className="NavbarLogo" />
			</a>

			{location.pathname === '/Homepage' ? (
				<span>
					<Link to="/Messages">
						<span class="material-symbols-outlined NavDMButton">send</span>
					</Link>
				</span>
			) : (
				''
			)}

			{location.pathname === '/MyPage' ? (
				<span>
					<Link to="/EditProfile">
						<span class="material-symbols-outlined NavEditButton">edit</span>
					</Link>
					<Link to="/Profile">
						<span class="material-symbols-outlined NavSettingsButton">
							settings
						</span>
					</Link>
				</span>
			) : (
				''
			)}
		</nav>
	);
}

export default Nav;
