import './App.css';
import { useState } from 'react';
import M from 'materialize-css';
import Nav from './Components/Navbar/Nav';
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
		<div className="App">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<Nav />
					<Homepage />
				</>
			)}
		</div>
	);
}

export default App;
