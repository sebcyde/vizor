import './App.css';
import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useNavigate,
} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './Components/Firebase/Firebase';
import { initializeApp } from 'firebase/app';
import M from 'materialize-css';
import Nav from './Components/Navbar/TopNav/Nav';
import Profile from './Components/Profile/Profile';
import Homepage from './Components/Homepage/Homepage';
import Favourites from './Components/Favourites/Favourites';
import LikedImages from './Components/LikedImages/LikedImages';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import MyPage from './Components/MyPage/MyPage';
import BottomNav from './Components/Navbar/BottomNav/BottomNav';
import Explore from './Components/Explore/Explore';
import Upload from './Components/MyPage/Upload/Upload';
import Messages from './Components/Messages/Messages';
import EditProfile from './Components/MyPage/EditProfile/EditProfile';

function App() {
	const [Loading, setLoading] = useState(true);
	const [Theme, setTheme] = useState('Light App');
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	setTimeout(() => {
		setLoading(false);
	}, 2000);

	useEffect(() => {
		const Body = document.body;
		const color = window.localStorage.getItem('AppColorScheme');
		Body.classList.add(color);
	}, []);

	return (
		<Router>
			<div className={Theme}>
				{Loading ? (
					<LoadingScreen />
				) : (
					<>
						<Routes>
							<Route path="/" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/Homepage" element={<Homepage />} />
							<Route path="/MyPage" element={<MyPage />} />
							<Route path="/Favourites" element={<Favourites />} />
							<Route path="/LikedImages" element={<LikedImages />} />
							<Route path="/Explore" element={<Explore />} />
							<Route path="/Upload" element={<Upload />} />
							<Route path="/Profile" element={<Profile />} />
							<Route path="/Messages" element={<Messages />} />
							<Route path="/EditProfile" element={<EditProfile />} />
						</Routes>
					</>
				)}
			</div>
		</Router>
	);
}

export default App;
