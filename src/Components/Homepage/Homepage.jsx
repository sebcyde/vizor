import React from 'react';
import Nav from '../Navbar/Nav';
import Fab from '../Fab/Fab';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Col, Card, CardTitle, Checkbox } from 'react-materialize';
import { auth, registerWithEmailAndPassword } from '../Firebase/Firebase';
import { useEffect, useState } from 'react';

function Homepage() {
	const navigate = useNavigate();
	const Access_Key = 'nMQhKYfCGhe3tce5azxV0KDvpsKH9zMIH1Ocp3IXhXM';

	const [img, setImg] = useState('Anime');
	const [res, setRes] = useState([]);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				navigate('/');
			}
		});
	}, []);

	// Working - don't abuse
	// finish card styling FIRST

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

	return (
		<div className="HomepageContainer">
			<Nav />
			<div className="HomepageCardHolder">
				<Card
					header={
						<CardTitle
							image="https://materializecss.com/images/sample-1.jpg"
							reveal
							waves="light"
						/>
					}
					reveal={
						<div className="CardDetailsContainer">
							<h3 className="CardDetailsOption"> - Add to favorites</h3>
							<Checkbox id="Checkbox_1" label="Red" value="Red" />
							<h3 className="CardDetailsOption"> - Add to collection</h3>
						</div>
					}
				></Card>

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
				<Fab />
			</div>
		</div>
	);
}

export default Homepage;
