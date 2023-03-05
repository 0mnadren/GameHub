import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ColorGame from './pages/color-game/ColorGame';
import ColorGameRules from './pages/color-game/color-game-rules/ColorGameRules';
import Typer from './pages/writing-game/Typer';
import TyperRules from './pages/writing-game/TyperRules';
import ScoreBoard from './pages/scoreboard/ScoreBoard';
import About from './pages/about/About';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/color-game" element={<ColorGame />} />
				<Route path="/color-game-rules" element={<ColorGameRules />} />
				<Route path="/typer" element={<Typer />} />
				<Route path="/typer-rules" element={<TyperRules />} />
				<Route path="/score-board" element={<ScoreBoard />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</Router>
	);
}

export default App;
