import { Link } from 'react-router-dom';
import './game-over.css';

interface GameOverInterface {
	gameTimer: number;
	getPercentage: () => string | 0;
	getWordsPerSecond: () => string | 0;
	getWordsPerMinute: () => string | 0;
	hadnleResetGame: () => void;
}

function GameOver({
	gameTimer,
	getPercentage,
	getWordsPerSecond,
	getWordsPerMinute,
	hadnleResetGame,
}: GameOverInterface) {
	return (
		<div className="gameover-container">
			<section>
				<div className="gameover-section-results">
					<div>Time left: {gameTimer}</div>
					<div>Percentage completed: {getPercentage()}%</div>
					{gameTimer ? (
						<div>You did {getWordsPerSecond()} words per second!</div>
					) : (
						<div>You did {getWordsPerMinute()} words per minute!</div>
					)}
				</div>

				<div className="buttons-container">
					<span>Thanks for playing!</span>
					<span> Don't forget to take a Screenshot before you leave!</span>
					<div>
						<Link to="/" className="btn">
							Home
						</Link>{' '}
						<button onClick={() => hadnleResetGame()} className="action-btn">
							Play again
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}

export default GameOver;
