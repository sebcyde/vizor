import Fab from '../Fab/Fab';
import Nav from '../Navbar/TopNav/Nav';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	list,
	getMetadata,
} from 'firebase/storage';
import { storage } from '../Firebase/FireStorage';
import { v4 } from 'uuid';
import { auth } from '../Firebase/Firebase';
import { MediaBox, Button } from 'react-materialize';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { querySnapshot } from '../Homepage/UserInfo/UserInfo';

function MyPage() {
	const [Loading, setLoading] = useState(true);
	const [UserData, setUserData] = useState();
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);
	const imagesListRef = ref(storage, `${auth.currentUser.uid}`);
	const navigate = useNavigate();
	const FinalImageList = [];
	const AllMetaData = [];
	const RawUserData = [];

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				navigate('/');
			} else {
				Run();
			}
		});
	}, []);

	// To be moved to the UploadPage component
	const uploadFile = () => {
		setLoading(true);
		if (imageUpload == null) return;
		const imageRef = ref(
			storage,
			`${auth.currentUser.uid}/${imageUpload.name + v4()}`
		);

		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			});
		});
		setLoading(false);
	};

	const Run = async () => {
		await querySnapshot(auth.currentUser.uid)
			.then((Data) => {
				setUserData(Data[0]);
				RawUserData.push(Data[0]);
				return;
			})
			.then(() => {
				console.log(RawUserData[0]);
			});

		await listAll(imagesListRef)
			.then((response) => {
				response.items.forEach((item) => {
					console.log(item);
					getDownloadURL(item).then((url) => {
						if (FinalImageList.length >= response.items.length) {
						} else {
							FinalImageList.push(url);
							setImageUrls((prev) => [...prev, url]);
						}
					});
					getMetadata(item)
						.then((metadata) => {
							console.log(metadata);
							if (AllMetaData.length >= response.items.length) {
							} else {
								AllMetaData.push(metadata);
							}
						})
						.catch((error) => {
							console.log(error);
						});
				});
			})
			.then(() => {
				return;
			})
			.then(() => {
				setLoading(false);
			});
	};

	return (
		<div className="MyPageContainer">
			<Nav />
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="UserDataContainer">
						<span className="PFPandFollowersContainer">
							<img
								src={
									RawUserData[0].ProfilePictureURL.stringValue === ''
										? require('../../Assets/DefaultMale.jpg')
										: RawUserData[0].ProfilePictureURL.stringValue
								}
								className="ProfilePhoto"
							/>
							<span className="FollowersFollowingContainer">
								<div className="PostsContainer">
									<h3 className="Followers">
										{auth.currentUser.FollowedByUsers.arrayValue.values
											? auth.currentUser.FollowedByUsers.arrayValue.values
											: '0'}
									</h3>
									<p>Posts</p>
								</div>
								<div className="FollowersContainer">
									<h3 className="Followers">
										{auth.currentUser.FollowedByUsers.arrayValue.values
											? auth.currentUser.FollowedByUsers.arrayValue.values
											: '0'}
									</h3>
									<p>Followers</p>
								</div>
								<div className="FollowingContainer">
									<h3 className="Following">
										{auth.currentUser.FollowedUsers.arrayValue.values.length}
									</h3>
									<p>Following</p>
								</div>
							</span>
						</span>
						<h3 className="UserName">
							{auth.currentUser.DisplayName.stringValue}
						</h3>
						<p className="Bio">{auth.currentUser.Bio.stringValue}</p>
					</div>

					<Button
						onClick={() => {
							console.log(UserData);
						}}
					>
						Pull Data
					</Button>
					<div class="grid-container">
						{imageUrls.map((url) => {
							//add in Lazy Loading for images
							// Grid is loading all in one row instead of three per row
							return (
								<MediaBox
									id="MediaBox_9"
									caption={url}
									options={{
										inDuration: 275,
										onCloseEnd: null,
										onCloseStart: null,
										onOpenEnd: null,
										onOpenStart: null,
										outDuration: 200,
									}}
								>
									<img alt="" src={url} width="650" className="grid-item" />
								</MediaBox>
							);
							// return <img src={url} className="MyPageImage" />;
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default MyPage;
