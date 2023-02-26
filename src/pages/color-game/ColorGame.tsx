import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import {
	COLORS,
	INITIAL_POINTS_VALUE,
	INITIAL_TIMER_VALUE,
} from '../../data/constants';
import { randomColorHandler } from '../../utils/utils';
import './color.css';
import scoreSound from '../../assets/audio/audio_score_sound.wav';
import errorSound from '../../assets/audio/audio_error_sound.wav';

function ColorGame() {
	const [gameTimer, setGameTimer] = useState(INITIAL_TIMER_VALUE);
	const [correctPoints, setCorrectPoints] = useState(INITIAL_POINTS_VALUE);
	const [incorrectPoints, setIncorrectPoints] = useState(INITIAL_POINTS_VALUE);
	const [intervalId, setIntervalId] = useState<null | number>(null);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [phase1, setPhase1] = useState(false);
	const [phase2, setPhase2] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const scoreAudio = new Audio(scoreSound);
	const errorAudio = new Audio(errorSound);

	useEffect(() => {
		if (gameTimer === 50) {
			setPhase1(true);
		} else if (gameTimer === 30) {
			setPhase2(true);
		}
	}, [gameTimer]);

	useEffect(() => {
		if (incorrectPoints !== 0) {
			errorAudio.play();
		}
		return () => {
			errorAudio.pause();
			errorAudio.currentTime = 0;
		};
	}, [incorrectPoints]);

	useEffect(() => {
		if (correctPoints !== 0) {
			scoreAudio.play();
		}
		return () => {
			scoreAudio.pause();
			scoreAudio.currentTime = 0;
		};
	}, [correctPoints]);

	const randomColor = useMemo(
		() => randomColorHandler(COLORS),
		[correctPoints, incorrectPoints, isGameStarted]
	);
	const randomTextColor = useMemo(
		() => randomColorHandler(COLORS),
		[correctPoints, incorrectPoints, isGameStarted]
	);

	function handleGameStart() {
		if (intervalId === null) {
			setIsGameStarted(true);
			inputRef.current && inputRef.current.focus();
			const id = setInterval(() => {
				setGameTimer(prev => prev - 1);
			}, 1000);
			setIntervalId(id);
		} else {
			console.log('Interval already started', setIntervalId);
		}
	}

	function handleGameReset() {
		if (intervalId !== null) {
			clearInterval(intervalId);
			setIntervalId(null);
			setGameTimer(INITIAL_TIMER_VALUE);
			setCorrectPoints(INITIAL_POINTS_VALUE);
			setIncorrectPoints(INITIAL_POINTS_VALUE);
			setIsGameStarted(false);
			setPhase1(false);
			setPhase2(false);
			inputRef.current !== null && (inputRef.current.value = '');
		}
	}

	function handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
		if (
			e.key === 'Enter' &&
			inputRef.current !== null &&
			inputRef.current.value.trim() !== ''
		) {
			const isCorrect = compareColorAndInput(
				randomTextColor,
				inputRef.current.value
			);

			isCorrect
				? setCorrectPoints(prev => prev + 1)
				: setIncorrectPoints(prev => prev + 1);

			inputRef.current.value = '';
		}
	}

	function compareColorAndInput(color: string, input: string) {
		return color.toLowerCase() === input.toLowerCase() ? true : false;
	}

	// Generates random color
	function makeRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * letters.length)];
		}
		return color;
	}

	// END GAME LOGIC
	if (incorrectPoints === 3 || gameTimer === 0) {
		//TODO: Maybe some Modal where to type the name to save to db together with the score
		if (intervalId !== null) {
			clearInterval(intervalId);
		}
	}
	return (
		<div className="color-game-container">
			<main
				style={{
					backgroundColor: phase2 ? makeRandomColor() : undefined,
					backgroundImage: phase2 ? 'none' : undefined,
				}}
			>
				<Navbar />
				<h1 style={{ color: phase1 ? makeRandomColor() : undefined }}>
					ColorGame
				</h1>
				<div className="container">
					<aside>
						<div
							style={{ color: phase2 ? makeRandomColor() : undefined }}
							className="timer"
						>
							Game Time: {gameTimer}
						</div>

						<div
							style={{ color: phase1 ? makeRandomColor() : undefined }}
							className="score"
						>
							Score: {correctPoints}
						</div>
						<div
							style={{ color: phase1 ? makeRandomColor() : undefined }}
							className="error"
						>
							Errors: {incorrectPoints}
						</div>
					</aside>
					<section>
						{isGameStarted && (
							<div className="input-label" style={{ color: randomTextColor }}>
								{randomColor}
							</div>
						)}
						<input
							tabIndex={0}
							ref={inputRef}
							onKeyDown={e => handleInput(e)}
							type="text"
							disabled={incorrectPoints >= 3 || (gameTimer <= 0 && true)}
						/>
					</section>
				</div>

				{/* BUTTONS */}
				{isGameStarted ? (
					<button className="action-btn" onClick={handleGameReset}>
						Reset Game
					</button>
				) : (
					<button className="action-btn" onClick={handleGameStart}>
						Play
					</button>
				)}

				{/* GAME OVER --> MODAL POP-UP */}
				{(incorrectPoints === 3 || gameTimer === 0) && (
					<Modal points={correctPoints} handleGameReset={handleGameReset} />
				)}
			</main>
		</div>
	);
}

export default ColorGame;
