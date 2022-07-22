import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Icon, NavItem } from 'react-materialize';

function Menubar() {
	return (
		<div>
			<Navbar
				alignLinks="right"
				id="mobile-nav"
				menuIcon={<Icon>menu</Icon>}
				options={{
					draggable: true,
					edge: 'left',
					inDuration: 250,
					onCloseEnd: null,
					onCloseStart: null,
					onOpenEnd: null,
					onOpenStart: null,
					outDuration: 200,
					preventScrolling: true,
				}}
			>
				<NavLink to="/" className="MenuBarItem">
					Home
				</NavLink>
				<NavLink to="/LikedImages" className="MenuBarItem">
					Liked Images
				</NavLink>
				<NavLink to="/Library" className="MenuBarItem">
					Collections
				</NavLink>
				<NavLink to="/Profile" className="MenuBarItem">
					My Profile
				</NavLink>
				<NavLink to="/Library" className="MenuBarItem">
					Sign Out
				</NavLink>
			</Navbar>
		</div>
	);
}

export default Menubar;
