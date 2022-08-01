import { React, useState, useEffect } from 'react';
import { auth, firebaseConfig } from '../../Firebase/Firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapshot = async (UID) => {
	let ReturnedUserInformation = [];

	await getDocs(collection(db, 'users')).then((result) => {
		let AllUsers = result.docs;

		AllUsers.forEach((DBuser) => {
			if (DBuser._document.data.value.mapValue.fields.uid.stringValue === UID) {
				let UserInfo = DBuser._document.data.value.mapValue.fields;
				ReturnedUserInformation.push(UserInfo);
			}
		});
	});
	console.log(ReturnedUserInformation[0]);

	return ReturnedUserInformation;
};

export { querySnapshot };
