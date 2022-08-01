import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import M from 'materialize-css';
import Nav from './Components/Navbar/TopNav/Nav';
import Profile from './Components/Profile/Profile';
import Homepage from './Components/Homepage/Homepage';
import Library from './Components/Library/Library';
import LikedImages from './Components/LikedImages/LikedImages';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import MyPage from './Components/MyPage/MyPage';
import BottomNav from './Components/Navbar/BottomNav/BottomNav';

function App() {
	const [Loading, setLoading] = useState(true);
	const [Theme, setTheme] = useState('Light App');

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
							<Route path="/Library" element={<Library />} />
							<Route path="/LikedImages" element={<LikedImages />} />
							{/* <Route path="/Explore" element={<ExplorePage />} /> */}
							{/* <Route path="/Upload" element={<UploadPage />} /> */}
							<Route path="/Profile" element={<Profile />} />
						</Routes>
						<BottomNav />
					</>
				)}
			</div>
		</Router>
	);
}

export default App;
