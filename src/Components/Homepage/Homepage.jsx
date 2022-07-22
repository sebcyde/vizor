import React from 'react';
import { Button, Icon } from 'react-materialize';

function Homepage() {
	return (
		<div>
			<h2>Homepage</h2>
			<Button
				className="red"
				fab={{
					direction: 'left',
					hoverEnabled: false,
				}}
				floating
				large
				node="button"
			>
				<Button
					className="red"
					floating
					icon={<Icon>insert_chart</Icon>}
					node="button"
				/>
				<Button
					className="yellow darken-1"
					floating
					icon={<Icon>format_quote</Icon>}
					node="button"
				/>
				<Button
					className="green"
					floating
					icon={<Icon>publish</Icon>}
					node="button"
				/>
			</Button>
		</div>
	);
}

export default Homepage;
