import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Col, Card, CardTitle } from 'react-materialize';

function Fab() {
	const ScrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

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
			<Button
				className="SubMenuButton"
				floating
				icon={<Icon>arrow_upward</Icon>}
				node="button"
				onClick={ScrollToTop}
			/>
			<Link to="/LikedImages">
				<Button
					className="SubMenuButton"
					floating
					icon={<Icon>favorite</Icon>}
					node="button"
				/>
			</Link>
			<Link to="/Library">
				<Button
					className="SubMenuButton"
					floating
					icon={<Icon>bookmarks</Icon>}
					node="button"
				/>
			</Link>
			<Link to="/">
				<Button
					className="SubMenuButton"
					floating
					icon={<Icon>home</Icon>}
					node="button"
				/>
			</Link>
			<Link to="/Profile">
				<Button
					className="SubMenuButton"
					floating
					icon={<Icon>person</Icon>}
					node="button"
				/>
			</Link>
		</Button>
	);
}

export default Fab;
