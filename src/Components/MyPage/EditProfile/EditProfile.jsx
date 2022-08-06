import React, { useState, useEffect } from 'react';
import Nav from '../../Navbar/TopNav/Nav';
import { querySnapshot } from '../../Homepage/UserInfo/UserInfo';
import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	list,
	getMetadata,
} from 'firebase/storage';
import { storage } from '../../Firebase/FireStorage';
import { auth } from '../../Firebase/Firebase';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import BarLoader from 'react-spinners/HashLoader';

function EditProfile() {
	const [Loading, setLoading] = useState(true);
	const [UserData, setUserData] = useState();
	const [SaveChangesText, setSaveChangesText] = useState('Save Changes');

	useEffect(() => {
		Run();
	}, []);

	const Upload = async () => {
		console.log('Upload Start');
		setTimeout(() => {
			console.log('Upload End');
		}, 3000);
	};

	const UpdateDetails = async () => {
		setSaveChangesText(<BarLoader color={'#7d82b8'} size={30} />);
		console.log('UD Function Start');

		await Upload().then(() => {
			setSaveChangesText('Changes Saved');
		});
	};

	const Run = async () => {
		await querySnapshot(auth.currentUser.uid)
			.then((Data) => {
				setUserData(Data[0]);
				return;
			})
			.then(() => {
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
								UserData.ProfilePictureURL.stringValue === ''
									? require('../../../Assets/DefaultMale.jpg')
									: UserData.ProfilePictureURL.stringValue
							}
						/>
						<span>
							<a>Change Profile Photo</a>
							<a>Remove Profile Photo</a>
						</span>
					</span>
					<span className="NameSpan">
						<input type="text" placeholder="Name" />
					</span>
					<span className="UserNameSpan">
						<input type="text" placeholder="Username" />
					</span>
					{/* <span className="PronounsSpan">
						<input type="text" placeholder="Pronouns" />
					</span> */}
					<span className="WebsiteSpan">
						<input type="text" placeholder="Website" />
					</span>
					<span className="BioSpan">
						<input type="text" placeholder="Bio" />
					</span>
					<span className="PhoneSpan">
						<input type="tel" placeholder="07123456789" />
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
