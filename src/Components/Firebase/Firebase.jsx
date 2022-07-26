import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
	apiKey: 'AIzaSyCJQJW4E49ZPLr0eZ196i6A5laQUaH528o',
	authDomain: 'vizor-b3c39.firebaseapp.com',
	projectId: 'vizor-b3c39',
	storageBucket: 'vizor-b3c39.appspot.com',
	messagingSenderId: '155562320658',
	appId: '1:155562320658:web:51765584cabb2b88e149cb',
	measurementId: 'G-1H32409DRD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (
	name,
	email,
	password,
	UserName
) => {
	try {
		const res = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
			UserName
		);
		const user = res.user;
		console.log(user);
		await setDoc(doc(db, 'users', user.uid), {
			uid: user.uid,
			name: name,
			authProvider: 'local',
			email: email,
			DisplayName: UserName,
			CreateDate: user.metadata.creationTime.slice(0, 16),
			FollowedUsers: [],
			FollowedByUsers: [],
			BlockedUsers: [],
			ProfilePictureURL: '',
			Bio: '',
			Verified: false,
			Gender: '',
			Posts: [],
			Phone: '',
			Website: '',
		});
		user.displayName = UserName;
		console.log('Registered Successfully');
	} catch (err) {
		console.error(err);
	}
};

const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		console.log('Signed In Successfully');
	} catch (err) {
		console.error(err);
	}
};

const logout = () => {
	signOut(auth);
	console.log('Signed Out Successfully');
};

export {
	firebaseConfig,
	auth,
	db,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	logout,
};
