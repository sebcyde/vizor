import React, { useState, useEffect } from 'react';
import Fab from '../Fab/Fab';
import {
	Tabs,
	Tab,
	Row,
	Col,
	Collection,
	CollectionItem,
	Switch,
	Button,
} from 'react-materialize';
import { auth, firebaseConfig } from '../Firebase/Firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function Profile() {
	const [Loading, setLoading] = useState(true);
	const [UserDetails, setUserDetails] = useState();
	const User = auth.currentUser;
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	const navigate = useNavigate;
	const AccountCreationDate = User.metadata.creationTime.slice(0, 16);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				navigate('/');
			}
		});
		querySnapshot().then(() => {
			setLoading(false);
		});
	}, []);

	const querySnapshot = async () => {
		setLoading(true);

		await getDocs(collection(db, 'users')).then((result) => {
			let AllUsers = result.docs;

			AllUsers.forEach((DBuser) => {
				if (
					DBuser._document.data.value.mapValue.fields.uid.stringValue ===
					auth.currentUser.uid
				) {
					let UserInfo = DBuser._document.data.value.mapValue.fields;
					console.log(UserInfo);
					setUserDetails(UserInfo);
				}
			});

			setLoading(false);
		});
	};

	return (
		<div className="ProfileContainer">
			<Tabs className="tab-demo z-depth-1" scope="tabs-22">
				<Tab
					active
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="General"
				>
					<h3>General Settings</h3>
					<Row>
						<Col m={6} s={12}>
							<Collection>
								<CollectionItem>
									<p>Dark Mode</p>
									<Switch id="Switch-20" />
								</CollectionItem>
								<CollectionItem>
									<p>Placeholder</p>
								</CollectionItem>
								<CollectionItem>
									<p>Placeholder</p>
								</CollectionItem>
								<CollectionItem>
									<p>Placeholder</p>
								</CollectionItem>
							</Collection>
						</Col>
					</Row>
				</Tab>
				<Tab
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Privacy"
				>
					<h3>Privacy Settings</h3>
					<Row>
						<Col m={6} s={12}>
							<Collection>
								<CollectionItem>
									<p>Dark Mode</p>
								</CollectionItem>
								<CollectionItem>
									<p>Placeholder</p>
								</CollectionItem>
								<CollectionItem>
									<p>Placeholder</p>
								</CollectionItem>
								<CollectionItem>
									<p>Placeholder</p>
								</CollectionItem>
							</Collection>
						</Col>
					</Row>
				</Tab>

				<Tab
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Account"
				>
					{Loading ? (
						<LoadingScreen />
					) : (
						<>
							<h3>Account Settings</h3>
							<Row>
								<Col m={6} s={12}>
									<Collection>
										<CollectionItem>
											<p>Name:</p>
											<p>{UserDetails.name.stringValue}</p>
										</CollectionItem>
										<CollectionItem>
											<p>UserName:</p>
											<p>{UserDetails.DisplayName.stringValue}</p>
										</CollectionItem>
										<CollectionItem>
											<p>Email:</p>
											<p>{UserDetails.email.stringValue}</p>
										</CollectionItem>

										<CollectionItem>
											<p>Joined:</p>
											<p>{UserDetails.CreateDate.stringValue}</p>
										</CollectionItem>
										<Button
											className="DataSnapshotButton"
											onClick={querySnapshot}
										>
											Data Snapshot
										</Button>
									</Collection>
								</Col>
							</Row>
						</>
					)}
				</Tab>
			</Tabs>

			<Fab />
		</div>
	);
}

export default Profile;
