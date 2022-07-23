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
} from 'react-materialize';

function Profile() {
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
									<p>UserName:</p>
									<p>Dark Mode</p>
								</CollectionItem>
								<CollectionItem>
									<p>First Name:</p>
									<p>Dark Mode</p>
								</CollectionItem>
								<CollectionItem>
									<p>Last Name:</p>
									<p>Dark Mode</p>
								</CollectionItem>
								<CollectionItem>
									<p>Account Created:</p>
									<p>Dark Mode</p>
								</CollectionItem>
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
