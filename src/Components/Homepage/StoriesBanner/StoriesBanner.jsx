import { React, useState, useEffect } from 'react';
import { auth, firebaseConfig } from '../../Firebase/Firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import DefaultMale from '../../../Assets/DefaultMale.jpg';
import DefaultFemale from '../../../Assets/DefaultFemale.jpg';

function StoriesBanner() {
	const [Stories, setStories] = useState();
	const User = auth.currentUser;
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	useEffect(() => {
		querySnapshot();
	}, []);

	const querySnapshot = async () => {
		let ReturnedUserInformation = [];

		await getDocs(collection(db, 'users'))
			.then((result) => {
				let AllUsers = result.docs;

				AllUsers.forEach((DBuser) => {
					console.log(DBuser._document.data.value.mapValue.fields);
					if (
						DBuser._document.data.value.mapValue.fields.uid.stringValue ===
						User.uid
					) {
						let UserInfo = DBuser._document.data.value.mapValue.fields;
						console.log(UserInfo);

						UserInfo.FollowedUsers.arrayValue.values.forEach((user) => {
							ReturnedUserInformation.push(user);
						});
					}
				});
				console.log(ReturnedUserInformation);
				return;
			})
			.then(() => {
				setStories(
					ReturnedUserInformation.map((user) => {
						let Info = user.mapValue.fields;
						let PFP =
							Info.ProfilePictureURL.mapValue.fields.stringValue.stringValue;

						// Add in User.Gender check for Default image here
						console.log(DefaultMale);
						console.log(Info);
						return (
							<div className="StoryContainer">
								<img
									className="StoryPosterProfileImage"
									src={
										PFP.length === 0
											? require('../../../Assets/DefaultMale.jpg')
											: PFP
									}
								/>
								<p className="StoryPosterUsername">
									{Info.DisplayName.mapValue.fields.stringValue.stringValue}
								</p>
							</div>
						);
					})
				);
			});
		console.log(ReturnedUserInformation);
	};

	return <div className="StoriesBannerContainer">{Stories}</div>;
}

export default StoriesBanner;
