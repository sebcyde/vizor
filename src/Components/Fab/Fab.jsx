import React, { useEffect, useState } from 'react';
import { useLocation, Link, usNavigate, useNavigate } from 'react-router-dom';
import { Button, Icon, Col, Card, CardTitle } from 'react-materialize';
import { logout, auth } from '../Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Fab() {
	const navigate = useNavigate();

	const ScrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				navigate('/');
			}
		});
	}, []);

	const Logout = () => {
		logout();
	};

	let location = useLocation();

	return (
		<Button
			className="MenuButton"
			fab={{
				hoverEnabled: false,
			}}
			floating
			large
			icon={<Icon>menu</Icon>}
			node="button"
		>
			{location.pathname === '/Profile' ? (
				''
			) : (
				<Button
					className="SubMenuButton"
					floating
					icon={<Icon>arrow_upward</Icon>}
					node="button"
					onClick={ScrollToTop}
				/>
			)}

			{location.pathname === '/LikedImages' ? (
				''
			) : (
				<Link to="/LikedImages">
					<Button
						className="SubMenuButton"
						floating
						icon={<Icon>favorite</Icon>}
						node="button"
					/>
				</Link>
			)}

			{location.pathname === '/Library' ? (
				''
			) : (
				<Link to="/Library">
					<Button
						className="SubMenuButton"
						floating
						icon={<Icon>bookmarks</Icon>}
						node="button"
					/>
				</Link>
			)}

			{location.pathname === '/MyPage' ? (
				''
			) : (
				<Link to="/MyPage">
					<Button
						className="SubMenuButton"
						floating
						icon={<Icon>person</Icon>}
						node="button"
					/>
				</Link>
			)}

			{location.pathname === '/Homepage' ? (
				''
			) : (
				<Link to="/">
					<Button
						className="SubMenuButton"
						floating
						icon={<Icon>home</Icon>}
						node="button"
					/>
				</Link>
			)}

			{location.pathname === '/Profile' ? (
				''
			) : (
				<Link to="/Profile">
					<Button
						className="SubMenuButton"
						floating
						icon={<Icon>settings</Icon>}
						node="button"
					/>
				</Link>
			)}
			{location.pathname === '/Profile' ? (
				<Button
					className="SubMenuButton"
					floating
					icon={<Icon>logout</Icon>}
					node="button"
					onClick={Logout}
				/>
			) : (
				''
			)}
		</Button>
	);
}

export default Fab;
