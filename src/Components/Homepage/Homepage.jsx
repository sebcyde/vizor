import { React, useEffect, useState } from 'react';
import Nav from '../Navbar/Nav';
import Fab from '../Fab/Fab';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';
import UserDet
import { Follow } from '../Actions/FollowUser/FollowUser';
import { BlockUser } from '../Actions/BlockUser/BlockUser';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {
	Icon,
	Col,
	Card,
	CardTitle,
	Checkbox,
	Button,
	Breadcrumb,
} from 'react-materialize';

function Homepage() {
	const navigate = useNavigate();

	const Access_Key = 'nMQhKYfCGhe3tce5azxV0KDvpsKH9zMIH1Ocp3IXhXM';
	const [RenderedElements, setRenderedElements] = useState();
	const [UserVisited, setUserVisited] = useState();
	const [UsersPage, setUsersPage] = useState(false);
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

	const Download = (Item) => {
		window.open(Item.links.download);
	};

	const PullData = async () => {
		setLoading(true);
		axios
			.get(
				`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
			)
			.then((response) => {
				response.data.results.forEach((Item) => {
					ReturnedItems.push(Item);
				});
			})
			.then(() => [
				setRenderedElements(
					ReturnedItems.map((Item) => {
						return (
							<div className="ImageContainer">
								<span className="CreatorInfo">
									<img
										src={Item.user.profile_image.medium}
										className="ProfilePhoto"
									/>
									<p
										onClick={() => {
											VisitUsersPage(Item.user.username);
										}}
									>
										{Item.user.name}
									</p>
									<Button
										className="FollowUserButton"
										onClick={() => {
											Follow(Item.user.username);
										}}
									>
										Follow
									</Button>
								</span>
								<div>
									<img src={Item.urls.regular} />
									<div className="ImageDetailContainer">
										<span>
											<Icon>thumb_up_off_alt</Icon>
											<p>{Item.user.total_likes}</p>
											{MoreDetailsModal}

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
				setUsersPage(false);
				setLoading(false);
			});
	};

	const VisitUsersPage = async (UserNameToVisit) => {
		setLoading(true);
		setUserVisited(UserNameToVisit);
		axios
			.get(
				`https://api.unsplash.com/users/${UserNameToVisit}/photos/?client_id=${Access_Key}`
			)
			.then((response) => {
				ReturnedItems = [];
				response.data.forEach((Item) => {
					ReturnedItems.push(Item);
				});
			})
			.then(() => [
				setRenderedElements(
					ReturnedItems.map((Item) => {
						return (
							<div className="ImageContainer">
								<span className="CreatorInfo">
									<img
										src={Item.user.profile_image.medium}
										className="ProfilePhoto"
									/>
									<p
										onClick={() => {
											VisitUsersPage(Item.user.username);
										}}
									>
										{Item.user.name}
									</p>
								</span>
								<div>
									<img src={Item.urls.regular} />
									<div className="ImageDetailContainer">
										<span>
											<Icon>thumb_up_off_alt</Icon>
											<p>{Item.user.total_likes}</p>
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
				setUsersPage(true);
				setLoading(false);
			});
	};

	// Will autopull data on page load
	// useEffect(() => {
	// PullData()
	// }, []);

	return (
		<div className="HomepageContainer">
			{UsersPage ? (
				<Breadcrumb className="teal" cols={12}>
					<a
						onClick={() => {
							PullData();
						}}
					>
						Home
					</a>
					<a>{UserVisited}</a>
				</Breadcrumb>
			) : (
				<Nav />
			)}
			<Button
				className="DataSnapshotButton"
				onClick={
					UsersPage
						? () => {
								VisitUsersPage(UserVisited);
						  }
						: () => {
								PullData();
						  }
				}
			>
				Refresh
			</Button>
			<div className="HomepageCardHolder">
				{Loading ? <LoadingScreen /> : <>{RenderedElements}</>}
			</div>
			<Fab />
		</div>
	);
}

export default Homepage;
