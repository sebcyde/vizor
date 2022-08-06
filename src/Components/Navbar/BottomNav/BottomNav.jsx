import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function BottomNav() {
	const navigate = useNavigate;

	return (
		<nav className="BottomNavbarContainer">
			<Link to="/">
				<span class="material-symbols-outlined BottomNavButton">home</span>
			</Link>
			<Link to="/Explore">
				<span class="material-symbols-outlined BottomNavButton">search</span>
			</Link>

			<Link to="/Upload">
				<span class="material-symbols-outlined BottomNavButton">add</span>
			</Link>

			<Link to="/Favourites">
				<span class="material-symbols-outlined BottomNavButton BottomNavCollections">
					collections_bookmark
				</span>
			</Link>

			{/* <Link to="/LikedImages">
				<span class="material-symbols-outlined BottomNavButton">bookmark</span>
			</Link> */}

			<Link to="/MyPage">
				<span class="material-symbols-outlined BottomNavButton">person</span>
			</Link>
		</nav>
	);
}

export default BottomNav;
