import { React, useEffect, useState } from 'react';
import Nav from '../Navbar/TopNav/Nav';
import Fab from '../Fab/Fab';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firebaseConfig } from '../Firebase/Firebase';
import { Follow } from '../Actions/FollowUser/FollowUser';
import { BlockUser } from '../Actions/BlockUser/BlockUser';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { initializeApp } from 'firebase/app';
import { querySnapshot } from './UserInfo/UserInfo';
import StoriesBanner from './StoriesBanner/StoriesBanner';
import {
	Icon,
	Col,
	Card,
	CardTitle,
	Checkbox,
	Button,
	Breadcrumb,
} from 'react-materialize';
import {
	getFirestore,
	collection,
	doc,
	addDoc,
	getDocs,
	setDoc,
	updateDoc,
	FieldValue,
	arrayUnion,
} from 'firebase/firestore';
import BottomNav from '../Navbar/BottomNav/BottomNav';

function Homepage() {
	const navigate = useNavigate();
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	const Access_Key = 'nMQhKYfCGhe3tce5azxV0KDvpsKH9zMIH1Ocp3IXhXM';
	const [RenderedElements, setRenderedElements] = useState();
	const [UserVisited, setUserVisited] = useState();
	const [UserInformation, setUserInformation] = useState();
	const [UserInfoElement, setUserInfoElement] = useState();
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

		// axios
		// 	.get(
		// 		`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
		// 	)

		await getDocs(collection(db, 'users'))
			.then((result) => {
				let AllUsers = result.docs;
				console.log(AllUsers);
				return AllUsers;
			})
			.then((AllUsers) => {
				AllUsers.forEach((user) => {
					ReturnedItems.push(user);
				});
			})
			.then(() => [
				setRenderedElements(
					ReturnedItems.map((user) => {
						let userdata = user._document.data.value.mapValue.fields;
						console.log(userdata);

						return (
							<div className="ImageContainer">
								<span className="CreatorInfo">
									{/* <img
										src={userdata.ProfilePictureURL.stringValue}
										className="ProfilePhoto"
									/> */}
									<p
										onClick={() => {
											VisitUsersPage(userdata.DisplayName.stringValue);
										}}
									>
										{userdata.DisplayName.stringValue}
									</p>
									{/* <Icon className="UserPostMoreIcon">more_horiz</Icon> */}
									<Button
										className="FollowUserButton"
										onClick={() => {
											Follow(userdata);
										}}
									>
										Follow
									</Button>
								</span>
								{/* <div>
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
								</div> */}
							</div>
						);
					})
				),
			])
			.then(() => {
				setUsersPage(false);
				setLoading(false);
			});
	};

	const VisitUsersPage = async (UserNameToVisit) => {
		await querySnapshot('muFoHZkBrCg1M4LyOquNYCjQG172').then((result) => {
			setUserInfoElement(
				result.map((Result) => {
					return (
						<div>
							<h2>{Result.DisplayName}</h2>
							<span>
								<p>Following: {Result.FollowedUsers.length}</p>
							</span>
						</div>
					);
				})
			);
			return;
		});

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
				setUsersPage(true);
				setLoading(false);
			});
	};

	// Will autopull data on page load
	useEffect(() => {
		PullData();
	}, []);

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
				<>
					<Nav />
					<StoriesBanner />
				</>
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
				Pull Data
			</Button>
			<div className="HomepageCardHolder">
				{Loading ? (
					<LoadingScreen />
				) : (
					<>
						{UsersPage ? { UserInfoElement } : null}

						{RenderedElements}
					</>
				)}
			</div>
		</div>
	);
}

export default Homepage;
