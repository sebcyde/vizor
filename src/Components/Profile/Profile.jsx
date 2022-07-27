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
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

function Profile() {
	const User = auth.currentUser;
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	const UpdateUserData = () => {};

	const querySnapshot = async () => {
		await getDocs(collection(db, 'users')).then((result) => {
			console.log(auth);
		});
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
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
					<h3>Account Settings</h3>
					<Row>
						<Col m={6} s={12}>
							<Collection>
								<CollectionItem>
									<p>Name:</p>
									<p>Placeholder</p>
								</CollectionItem>
								<CollectionItem>
									<p>UserName:</p>
									<p>{User.displayName}</p>
								</CollectionItem>
								<CollectionItem>
									<p>Email:</p>
									<p>{User.email}</p>
								</CollectionItem>

								<CollectionItem>
									<p>Account Created:</p>
									<p>Dark Mode</p>
								</CollectionItem>
								<Button onClick={querySnapshot}>Data Snapshot</Button>
							</Collection>
						</Col>
					</Row>
				</Tab>
			</Tabs>

			<Fab />
		</div>
	);
}

export default Profile;
