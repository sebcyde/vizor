import React from 'react';
import Nav from '../Navbar/Nav';
import Fab from '../Fab/Fab';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
	Icon,
	Col,
	Card,
	CardTitle,
	Checkbox,
	Button,
} from 'react-materialize';
import { auth, registerWithEmailAndPassword } from '../Firebase/Firebase';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function Homepage() {
	const navigate = useNavigate();
	const Access_Key = 'nMQhKYfCGhe3tce5azxV0KDvpsKH9zMIH1Ocp3IXhXM';
	const [RenderedElements, setRenderedElements] = useState();
	const [Loading, setLoading] = useState(true);
	const [img, setImg] = useState('Anime');
	const [Res, setRes] = useState();

	let ReturnedItems = [];

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				navigate('/');
			}
		});
	}, []);

	const fetchRequest = async () => {
		await fetch(
			`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
		).then((response) => {
			const dataJ = response.json();
			setRes(response.json().results);
			setLoading(false);
		});
	};

	const Download = (Item) => {
		window.open(Item.links.download);
	};

	const PullData = async () => {
		axios
			.get(
				`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
			)
			.then((response) => {
				// console.log(response.data.results);
				setRes(ReturnedItems);
				response.data.results.forEach((Item) => {
					ReturnedItems.push(Item);
				});
			})
			.then(() => [
				setRenderedElements(
					ReturnedItems.map((Item) => {
						console.log(Item);
						return (
							<div className="ImageContainer">
								<span className="CreatorInfo">
									<img
										src={Item.user.profile_image.medium}
										className="ProfilePhoto"
									/>
									<p>{Item.user.name}</p>
								</span>
								<div>
									<img src={Item.urls.regular} />
									<div className="ImageDetailContainer">
										<span>
											<Icon>thumb_up_off_alt</Icon>
											<p>{Item.user.total_likes} Likes</p>
											<a
												onClick={() => {
													Download(Item);
												}}
											>
												<Icon>download</Icon>
											</a>
										</span>
										<div className="DescriptionContainer">
											<p className="Description">
												{Item.description
													? `${Item.user.name} : ${Item.description}`
													: null}
											</p>
										</div>
									</div>
								</div>
							</div>
						);
					})
				),
			])
			.then(() => {
				console.log(ReturnedItems);
				setLoading(false);
			});
	};

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
	// PullData()
	// }, []);

	return (
		<div className="HomepageContainer">
			<Nav />
			<Button className="DataSnapshotButton" onClick={PullData}>
				Pull Data
			</Button>
			<div className="HomepageCardHolder">
				{Loading ? <LoadingScreen /> : <>{RenderedElements}</>}
			</div>
			<Fab />
		</div>
	);
}

export default Homepage;
