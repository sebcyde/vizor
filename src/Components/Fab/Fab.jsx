import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, Icon, Col, Card, CardTitle } from 'react-materialize';

function Fab() {
	const ScrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
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

			{location.pathname === '/' ? (
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
						icon={<Icon>person</Icon>}
						node="button"
					/>
				</Link>
			)}
		</Button>
	);
}

export default Fab;
