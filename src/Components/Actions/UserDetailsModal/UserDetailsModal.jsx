import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const UserDetailsModal = () => {
	const [open, setOpen] = useState(false);

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);

	return (
		<div>
			<button onClick={onOpenModal}>Open modal</button>
			<Modal open={open} onClose={onCloseModal} center>
				<h2>Simple centered modal</h2>
			</Modal>
		</div>
	);
};

ReactDOM.render(<UserDetailsModal />, document.getElementById('app'));
