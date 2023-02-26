import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ColorGame from './pages/color-game/ColorGame';
import Typer from './pages/writing-game/Typer';
import ScoreBoard from './pages/scoreboard/ScoreBoard';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/color-game" element={<ColorGame />} />
				<Route path="/typer" element={<Typer />} />
				<Route path="/score-board" element={<ScoreBoard />} />
			</Routes>
		</Router>
	);
}

export default App;
