import { React } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, auth } from '../../Firebase/Firebase';
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
	arrayUnion,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Follow = async (FollowedUser) => {
	// await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
	// 	FollowedUsers: { ...FollowedUser },
	// });

	console.log(auth.currentUser);

	await getDocs(collection(db, 'users')).then((result) => {
		let AllUsers = result.docs;
		console.log(AllUsers);

		AllUsers.forEach((DBuser, i) => {
			console.log(i);
			console.log(auth.currentUser.uid);
			console.log(DBuser._document.data.value.mapValue.fields.uid.stringValue);
			if (
				DBuser._document.data.value.mapValue.fields.uid.stringValue ===
				auth.currentUser.uid
			) {
				console.log('Match Successful');
				let UserInfo = DBuser._document.data.value.mapValue.fields;
				console.log(UserInfo);

				// below is searching for wrong value
				const FollowRef = doc(db, 'users', UserInfo.uid.stringValue);
				// below is correct
				setDoc(
					FollowRef,
					{ FollowedUsers: arrayUnion(FollowedUser) },
					{ merge: true }
				);
			} else {
				console.log('Not A Match');
			}
		});

		// AllUsers.forEach((DBuser) => {
		// 	if (
		// 		DBuser._document.data.value.mapValue.fields.uid.stringValue ===
		// 		auth.currentUser.uid
		// 	) {
		// 		console.log(DBuser._document.data.value.mapValue.fields);
		// 	}
		// });

		console.log('User Follow Successful');
	});
};

export { Follow };
