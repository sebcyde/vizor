import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import M from 'materialize-css';
import Nav from './Components/Navbar/Nav';
import Menubar from './Components/Menubar/Menubar';
import Profile from './Components/Profile/Profile';
import Homepage from './Components/Homepage/Homepage';
import Library from './Components/Library/Library';
import LikedImages from './Components/LikedImages/LikedImages';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';

function App() {
	const [Loading, setLoading] = useState(true);

	setTimeout(() => {
		setLoading(false);
	}, 3000);

	return (
		<Router>
			<div className="App">
				{Loading ? (
					<LoadingScreen />
				) : (
					<>
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route path="/Library" element={<Library />} />
							<Route path="/LikedImages" element={<LikedImages />} />
							<Route path="/Profile" element={<Profile />} />
						</Routes>
					</>
				)}
			</div>
		</Router>
	);
}

export default App;
