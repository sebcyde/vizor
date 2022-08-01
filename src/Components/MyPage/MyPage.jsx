import Fab from '../Fab/Fab';
import Nav from '../Navbar/TopNav/Nav';
import React, { useState, useEffect } from 'react';
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
import { MediaBox } from 'react-materialize';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { querySnapshot } from '../Homepage/UserInfo/UserInfo';

function MyPage() {
	const [Loading, setLoading] = useState(true);
	const [UserData, setUserData] = useState();
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);
	const imagesListRef = ref(storage, `${auth.currentUser.uid}`);
	const FinalImageList = [];
	const AllMetaData = [];

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

	useEffect(() => {
		Run();
	}, []);

	const Run = async () => {
		await querySnapshot(auth.currentUser.uid)
			.then((Data) => {
				console.log(Data[0]);
				setUserData(Data[0]);
				return;
			})
			.then(() => {
				listAll(imagesListRef)
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
						console.log(FinalImageList);
						console.log(AllMetaData);
						return;
					})
					.then(() => {
						setLoading(false);
						console.log(UserData);
					});
			});
	};

	return (
		<div className="MyPageContainer">
			<Nav />
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					{imageUrls.map((url) => {
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
								<img alt="" src={url} width="650" />
							</MediaBox>
						);
						// return <img src={url} className="MyPageImage" />;
					})}

					<Fab />
				</>
			)}
		</div>
	);
}

export default MyPage;
