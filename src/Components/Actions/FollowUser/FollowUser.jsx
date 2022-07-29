import React from 'react';
import { initializeApp } from 'firebase/app';
import {
	registerWithEmailAndPassword,
	firebaseConfig,
	auth,
} from '../../Firebase/Firebase';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
	collection,
	doc,
	addDoc,
	getDocs,
	setDoc,
	updateDoc,
	FieldValue,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const User = auth.currentUser;

const Follow = async (FollowedUser) => {
	// await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
	// 	FollowedUsers: { ...FollowedUser },
	// });

	// const FollowRef = db.collection('users').doc(auth.currentUser.id);
	// console.log(FollowRef);

	// await FollowRef.update({
	// 	FollowedUsers: FieldValue.arrayUnion(FollowedUser),
	// });

	console.log(User);

	await getDocs(collection(db, 'users')).then((result) => {
		let AllUsers = result.docs;
		let CurrentUserInfo = result.docs[0]._document.data.value.mapValue.fields;
		console.log(AllUsers);
		console.log(CurrentUserInfo);
		console.log(User);
		// Gets the details of the current user by their UID

		const FollowRef = doc(db, 'users', User.id);
		setDoc(FollowRef, { FollowedUsers: FollowedUser }, { merge: true });

		// AllUsers.forEach((User) => {
		// 	if (
		// 		User._document.data.value.mapValue.fields.uid === CurrentUserInfo.uid
		// 	) {
		// 		let UserInfo = User._document.data.value.mapValue.fields;
		// 		console.log('Followed User:');
		// 		console.log(FollowedUser);
		// 		console.log('Current User:');
		// 		console.log(UserInfo);
		// 		console.log('Current User Following:');
		// 		console.log(UserInfo.FollowedUsers);
		// 		console.log(UserInfo.FollowedUsers.arrayValue);
		// 		console.log('Current User ID:');
		// 		console.log(User.id);
		// 		// updateDoc(`users/${User.id}/FollowedUsers`).arrayUnion(...FollowedUser);
		// 		const FollowRef = db.collection('users').doc(User.id);
		// 		console.log(FollowRef);
		// 		FollowRef.update({
		// 			FollowedUsers: FieldValue.arrayUnion(FollowedUser),
		// 		});
		// 	}
		// });
		console.log('Break');
	});

	await getDocs(collection(db, 'users')).then((result) => {
		let CurrentUserInfo = result.docs[0]._document.data.value.mapValue.fields;
		console.log(CurrentUserInfo);
	});

	// console.log('User Follow Successful');
};

export { Follow };
