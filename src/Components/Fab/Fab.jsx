import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Col, Card, CardTitle } from 'react-materialize';

function Fab() {
	return (
		<Button
			className="MenuButton"
			fab={{
				direction: 'left',
				hoverEnabled: false,
			}}
			floating
			large
			icon={<Icon>menu</Icon>}
			node="button"
		>
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
				/>{' '}
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
