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

const BlockUser = async (BlockedUser) => {
	await getDocs(collection(db, 'users')).then((result) => {
		let AllUsers = result.docs;

		AllUsers.forEach((DBuser) => {
			if (
				DBuser._document.data.value.mapValue.fields.uid.stringValue ===
				auth.currentUser.uid
			) {
				console.log('Match Successful');
				let UserInfo = DBuser._document.data.value.mapValue.fields;

				const BlockRef = doc(db, 'users', UserInfo.uid.stringValue);

				setDoc(
					BlockRef,
					{ BlockedUsers: arrayUnion(BlockedUser) },
					{ merge: true }
				);
			} else {
				console.log('Not A Match');
			}
		});

		console.log('User Block Successful');
	});
};

export { BlockUser };
