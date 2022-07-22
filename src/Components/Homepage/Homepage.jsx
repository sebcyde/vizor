import React from 'react';
import axios from 'axios';
import Nav from '../Navbar/Nav';
import { Link } from 'react-router-dom';
import { Button, Icon, Col, Card, CardTitle } from 'react-materialize';
import { useEffect, useState } from 'react';

function Homepage() {
	const Access_Key = 'nMQhKYfCGhe3tce5azxV0KDvpsKH9zMIH1Ocp3IXhXM';

	const [img, setImg] = useState('Anime');
	const [res, setRes] = useState([]);

	// Working - don't abuse

	// const fetchRequest = async () => {
	// 	const data = await fetch(
	// 		`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
	// 	);
	// 	const dataJ = await data.json();
	// 	const result = dataJ.results;
	// 	console.log(result);
	// 	setRes(result);
	// };

	// useEffect(() => {
	// 	fetchRequest().then(() => {
	// 		console.log(res);
	// 	});
	// }, []);

	<Col m={6} s={12}>
		<Card
			closeIcon={<Icon>close</Icon>}
			header={
				<CardTitle
					image="https://materializecss.com/images/sample-1.jpg"
					reveal
					waves="light"
				/>
			}
			reveal={
				<p>
					Here is some more information about this product that is only revealed
					once clicked on.
				</p>
			}
			revealIcon={<Icon>more_vert</Icon>}
			title="Card Title"
		>
			<p>
				<a href="#">This is a link</a>
			</p>
		</Card>
	</Col>;

	return (
		<div className="HomepageContainer">
			<Nav />
			<Col m={6} s={12}>
				<Card
					closeIcon={<Icon>close</Icon>}
					header={
						<CardTitle
							image="https://materializecss.com/images/sample-1.jpg"
							reveal
							waves="light"
						/>
					}
					reveal={
						<p>
							Here is some more information about this product that is only
							revealed once clicked on.
						</p>
					}
					revealIcon={<Icon>more_vert</Icon>}
					title="Card Title"
				></Card>
			</Col>

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
