import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { logout, auth } from '../Firebase/Firebase';

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

function writeUserData(userId, name, email, imageUrl) {
	const db = getDatabase();
	set(ref(db, 'users/' + userId), {
		username: name,
		email: email,
		profile_picture: imageUrl,
	});
}

function writeNewPost(uid, username, picture, title, body) {
	// A post entry.
	const postData = {
		author: username,
		uid: uid,
		body: body,
		title: title,
		starCount: 0,
		authorPic: picture,
	};

	// Get a key for a new Post.
	const newPostKey = push(child(ref(db), 'posts')).key;

	// Write the new post's data simultaneously in the posts list and the user's post list.
	const updates = {};
	updates['/posts/' + newPostKey] = postData;
	updates['/user-posts/' + uid + '/' + newPostKey] = postData;

	return update(ref(db), updates);
}

export { writeUserData, writeNewPost };
