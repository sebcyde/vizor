import React from 'react';
import Nav from '../Navbar/TopNav/Nav';
import { Tab, Tabs } from 'react-materialize';
import { Link, useNavigate } from 'react-router-dom';

function Messages() {
	const navigate = useNavigate();

	return (
		<div className="MessagesContainer">
			<Nav />
			<Tabs className="tab-demo z-depth-1" scope="tabs-22">
				<Tab
					active
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Priority"
				>
					<h2>Priority</h2>
				</Tab>
				<Tab
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Other"
				>
					<h2>Other</h2>
				</Tab>
				<Tab
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Spam"
				>
					<h2>Spam</h2>
				</Tab>
			</Tabs>
		</div>
	);
}

export default Messages;
