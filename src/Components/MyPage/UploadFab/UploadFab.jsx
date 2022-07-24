import React, { useEffect, useState } from 'react';
import { Button, Icon, Col, Card, CardTitle } from 'react-materialize';

function UploadFab() {
	return (
		<Button
			className="uploadFab"
			fab={{
				direction: 'right',
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
			<Button
				className="blue"
				floating
				icon={<Icon>attach_file</Icon>}
				node="button"
			/>
		</Button>
	);
}

export default UploadFab;
