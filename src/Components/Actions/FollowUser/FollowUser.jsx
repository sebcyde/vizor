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
	await getDocs(collection(db, 'users')).then((result) => {
		let AllUsers = result.docs;

		AllUsers.forEach((DBuser) => {
			if (
				DBuser._document.data.value.mapValue.fields.uid.stringValue ===
				auth.currentUser.uid
			) {
				let UserInfo = DBuser._document.data.value.mapValue.fields;

				const FollowRef = doc(db, 'users', UserInfo.uid.stringValue);

				setDoc(
					FollowRef,
					{ FollowedUsers: arrayUnion(FollowedUser) },
					{ merge: true }
				);
			}
		});

		console.log('User Follow Successful');
	});
};

export { Follow };
