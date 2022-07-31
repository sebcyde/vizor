import React from 'react';
import { auth, firebaseConfig, logout } from '../../Firebase/Firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, deleteUser } from 'firebase/auth';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	doc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { remove } from 'firebase/database';
import { findAllInRenderedTree } from 'react-dom/test-utils';

async function DeleteAccount() {
	const User = auth.currentUser;
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	const navigate = useNavigate;

	// To Delete From Firestore

	await getDocs(collection(db, 'users'))
		.then((result) => {
			let AllUsers = result.docs;

			AllUsers.forEach((DBuser) => {
				if (
					DBuser._document.data.value.mapValue.fields.uid.stringValue ===
					auth.currentUser.uid
				) {
					let UserInfo = DBuser._document.data.value.mapValue.fields;
					console.log(UserInfo);
					try {
						remove(collection(db, `${DBuser}`))
							.then(() => {
								console.log('Database User Deletion Successful');
							})
							.catch((error) => {
								console.log('Database User Deletion Failed');
								console.log(error);
							});
					} catch (error) {
						console.log('Database User Deletion Failed');
						console.log(error);
					}
				}
			});
			return;
		})
		.then(() => {
			// Delete User
			deleteUser(User)
				.then(() => {
					console.log('User Deletion Successful.');
				})
				.catch((error) => {
					console.log('User Deletion Unsuccessful');
					console.log(error);

					return;
				});
			return;
		});

	auth.onAuthStateChanged((user) => {
		if (user === null) {
			navigate('/');
		}
	});
}

export { DeleteAccount };
