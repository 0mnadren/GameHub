import { Link } from 'react-router-dom';
import correctImg from '../../../assets/img/correct_image.jpg';
import wrongImg from '../../../assets/img/wrong_image.jpg';
import Navbar from '../../../components/Navbar';
import './color-rules.css';

function ColorGameRules() {
	return (
		<div className="colorgame-rules-container">
			<main>
				<h1>Welcome to ColorSpeeder</h1>
				<h2>How to play it</h2>
				<p>
					The goal of the game is to score as many points as you can in 1 minute
					time frame. If you get 3 errors the Game is Over!
				</p>
				<div className="img-container">
					<img src={correctImg} alt="Correct answered example" />
					<img src={wrongImg} alt="Wrong answered example" />
				</div>
				<h3>Good Luck & Have Fun</h3>
				<div className="button-container">
					<Link className="link" to="/">
						Home
					</Link>
					<Link className="link" to="/color-game">
						Play ColorGame
					</Link>
				</div>
			</main>
		</div>
	);
}

export default ColorGameRules;
