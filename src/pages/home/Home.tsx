import { Link } from 'react-router-dom';
import './home.css';

function Home() {
	return (
		<div className="home-container">
			<main>
				<h1>Welcome to GameHub</h1>
				<p>
					The GameHub is a place where I tinker with FrontEnd technologies and
					build games
				</p>
				<p>
					I have had a lot of fun experimenting and creating these games, I hope
					you will have a great time playing them
				</p>
				<p>
					If you are interested to find more about me and my work visit the{' '}
					<Link to="/about">About</Link> section.
				</p>
				<h2>Enjoy the games!</h2>
				<div className="button-container">
					<Link className="link" to="color-game">
						ColorGame
					</Link>
					<Link className="link" to="typer">
						TyperGame
					</Link>
				</div>
			</main>
		</div>
	);
}

export default Home;
