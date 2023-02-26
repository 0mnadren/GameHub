import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import './scoreboard.css';

interface PlayerInterface {
	name: string;
	points: number;
}

function ScoreBoard() {
	const [isDeleted, setIsDeleted] = useState(false);

	const colorSpeederPlayers = localStorage.getItem('color-game');
	const playersList = colorSpeederPlayers && JSON.parse(colorSpeederPlayers);

	useEffect(() => {
		console.log('useEffect is called....');
	}, [isDeleted]);

	function deleteLocalStorage(key: string) {
		localStorage.removeItem(key);
		setIsDeleted(true);
	}

	return (
		<div className="scoreboard-container">
			<main>
				<Navbar />
				<h1>ScoreBoard for ColorSpeeder Game</h1>
				{playersList &&
					playersList.map((player: PlayerInterface) => {
						return (
							<div className="scoreboard" key={Math.random()}>
								<div>{player.name}</div>
								<span>|</span>
								<div>{player.points}</div>
							</div>
						);
					})}
				{!isDeleted && (
					<button
						onClick={() => deleteLocalStorage('color-game')}
						className="action-btn"
					>
						Reset ScoreBoard
					</button>
				)}
			</main>
		</div>
	);
}

export default ScoreBoard;
