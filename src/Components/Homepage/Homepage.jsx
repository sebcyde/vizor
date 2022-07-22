import React from 'react';
import Nav from '../Navbar/Nav';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';

function Homepage() {
	return (
		<div className="HomepageContainer">
			<Nav />
			<h2>Homepage</h2>
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
		</div>
	);
}

export default Homepage;
