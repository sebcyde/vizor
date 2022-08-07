import React, { useState, useEffect } from 'react';
import Nav from '../../Navbar/TopNav/Nav';
import { querySnapshot } from '../../Homepage/UserInfo/UserInfo';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
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
import { storage } from '../../Firebase/FireStorage';
import { auth, firebaseConfig } from '../../Firebase/Firebase';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import BarLoader from 'react-spinners/HashLoader';

function EditProfile() {
	const [SaveChangesText, setSaveChangesText] = useState('Save Changes');
	const [Loading, setLoading] = useState(true);
	const [UserData, setUserData] = useState();

	const [ProfilePicture, setProfilePicture] = useState();
	const [Name, setName] = useState('Name');
	const [Username, setUsername] = useState('Username');
	const [Website, setWebsite] = useState('Website');
	const [Bio, setBio] = useState('Bio');
	const [Phone, setPhone] = useState('Phone');
	const navigate = useNavigate();
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				navigate('/');
			} else {
				Run();
			}
		});
	}, []);

	const NameChange = (event) => {
		setUsername(event.target.value);
	};

	const UsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const WebsiteChange = (event) => {
		setWebsite(event.target.value);
	};

	const BioChange = (event) => {
		setBio(event.target.value);
	};

	const PhoneChange = (event) => {
		setPhone(event.target.value);
	};

	const RemovePhoto = async () => {
		console.log('Removing Photo');
	};

	const UpdateDetails = async () => {
		setSaveChangesText(<BarLoader color={'#7d82b8'} size={30} />);
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

						const UserRef = doc(db, 'users', UserInfo.uid.stringValue);

						setDoc(
							UserRef,
							{ name: Name },
							{ DisplayName: Username },
							{ Website: Website },
							{ Bio: Bio },
							{ Phone: Phone }
						);
					}
				});
			})
			.then(() => {
				console.log(auth.currentUser);
				setSaveChangesText('Changes Saved');
			});
	};

	const Run = async () => {
		await querySnapshot(auth.currentUser.uid)
			.then((Data) => {
				setProfilePicture(Data[0].ProfilePictureURL.stringValue);
				setName(Data[0].name.stringValue);
				setUsername(Data[0].DisplayName.stringValue);
				// setWebsite(Data[0].Website.stringValue);
				setBio(Data[0].Bio.stringValue);
				// setPhone(Data[0].Phone.stringValue);
				return;
			})
			.then(() => {
				console.log(UserData);
				setLoading(false);
			});
	};

	return (
		<div
			className="EditProfileContainer
    "
		>
			<Nav />
			{Loading ? (
				<LoadingScreen />
			) : (
				<form>
					<span className="PhotoSpan">
						<img
							src={
								ProfilePicture === ''
									? require('../../../Assets/DefaultMale.jpg')
									: ProfilePicture
							}
						/>
						<span>
							<a
							// onClick={() => {
							// 	RemovePhoto();
							// }}
							>
								Change Profile Photo
							</a>
							<a
								onClick={() => {
									RemovePhoto();
								}}
							>
								Remove Profile Photo
							</a>
						</span>
					</span>
					<span className="NameSpan">
						<input type="text" placeholder={Name} onChange={NameChange} />
					</span>
					<span className="UserNameSpan">
						<input
							type="text"
							placeholder={Username}
							onChange={UsernameChange}
						/>
					</span>
					{/* <span className="PronounsSpan">
						<input type="text" placeholder="Pronouns" />
					</span> */}
					<span className="WebsiteSpan">
						<input type="text" placeholder={Website} onChange={WebsiteChange} />
					</span>
					<span className="BioSpan">
						<input type="text" placeholder={Bio} onChange={BioChange} />
					</span>
					<span className="PhoneSpan">
						<input type="tel" placeholder={Phone} onChange={PhoneChange} />
					</span>

					<span className=""></span>
					<span className=""></span>
					<a
						onClick={() => {
							UpdateDetails();
						}}
					>
						{SaveChangesText}
					</a>
				</form>
			)}
		</div>
	);
}

export default EditProfile;
