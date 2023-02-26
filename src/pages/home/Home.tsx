import { Link } from 'react-router-dom';
import './home.css';
import correctImg from '../../assets/img/correct_image.jpg';
import wrongImg from '../../assets/img/wrong_image.jpg';

function Home() {
	return (
		<div className="home-container">
			<main>
				<h1>Welcome to ColorSpeeder</h1>
				<h2>How to play it</h2>
				<p>Hello and welcome to ColorSpeeder</p>
				<div className="img-container">
					<img src={correctImg} alt="Correct answered example" />
					<img src={wrongImg} alt="Wrong answered example" />
				</div>
				<h3>Good Luck & Have Fun</h3>
				<div className="button-container">
					<Link className="link" to="color-game">
						Play ColorGame
					</Link>
					<Link className="link" to="typer">
						Play TyperGame
					</Link>
				</div>
			</main>
		</div>
	);
}

export default Home;
