import React, { useState } from 'react';
import Fab from '../Fab/Fab';
import {
	Tabs,
	Tab,
	Row,
	Col,
	Collection,
	CollectionItem,
	Switch,
} from 'react-materialize';

function Profile() {
	let bool = true;
	const [Theme, setTheme] = useState(bool);
	const ChangeTheme = () => {
		setTheme((bool = !bool));
	};

	return (
		<div className="ProfileContainer">
			<Tabs className="tab-demo z-depth-1" scope="tabs-22">
				<Tab
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Settings"
				>
					<h3>General Settings</h3>
					<Row>
						<Col m={6} s={12}>
							<Collection>
								<CollectionItem>
									<p>Dark Mode</p>
									<Switch id="Switch-20" onChange={ChangeTheme} />
								</CollectionItem>
								<CollectionItem>Alvin</CollectionItem>
								<CollectionItem>Alvin</CollectionItem>
								<CollectionItem>Alvin</CollectionItem>
							</Collection>
						</Col>
					</Row>
				</Tab>
				<Tab
					active
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Privacy"
				>
					<h3>Privacy Settings</h3>
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
								<CollectionItem>Alvin</CollectionItem>
								<CollectionItem>Alvin</CollectionItem>
								<CollectionItem>Alvin</CollectionItem>
								<CollectionItem>Alvin</CollectionItem>
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
