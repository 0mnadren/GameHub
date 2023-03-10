import { useEffect, useRef, useState } from 'react';
import CountdownAnimation from '../../components/CountdownAnimation';
import GameOver from '../../components/GameOver';
import Navbar from '../../components/Navbar';
import ProgressBar from '../../components/ProgressBar';
import {
	CORRECT_TEXT_BACKGROUND_COLOR,
	INCORRECT_TEXT_BACKGROUND_COLOR,
} from '../../data/constants';
import useFetch from '../../hooks/useFetch';
import useGameStart from '../../hooks/useGameStart';
import './typer.css';

function Typer() {
	const { fetchedJokes, isLoading, error } = useFetch(
		'https://official-joke-api.appspot.com/jokes/ten'
	);
	const [userTypedValue, setUserTypedValue] = useState<string>('');
	const prevLastCorrectIndexRef = useRef<number | undefined>(undefined);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const lastIndexOfUserTypedValue = userTypedValue
		? userTypedValue.length - 1
		: undefined;

	const sliceIndexEndForTypedValue =
		lastIndexOfUserTypedValue !== undefined
			? lastIndexOfUserTypedValue + 1
			: undefined;

	const lastCorrectIndex =
		userTypedValue === fetchedJokes.slice(0, sliceIndexEndForTypedValue)
			? sliceIndexEndForTypedValue
			: undefined;

	let correctTypedText: string | null = null;
	if (
		lastCorrectIndex === undefined &&
		prevLastCorrectIndexRef.current === undefined
	) {
		correctTypedText = null;
	} else if (lastCorrectIndex !== undefined) {
		correctTypedText = fetchedJokes.slice(0, lastCorrectIndex);
	} else if (lastIndexOfUserTypedValue === undefined) {
		correctTypedText = null;
	} else {
		correctTypedText = fetchedJokes.slice(0, prevLastCorrectIndexRef.current);
	}
	const { gameTimer, isGameStarted, setIsGameStarted, gameOver, setGameOver } =
		useGameStart({ correctTypedText, fetchedJokes });

	const lastIncorrectIndex =
		userTypedValue !== fetchedJokes.slice(0, sliceIndexEndForTypedValue)
			? sliceIndexEndForTypedValue
			: undefined;

	const incorrectTypedText =
		lastIncorrectIndex !== undefined
			? fetchedJokes.slice(prevLastCorrectIndexRef.current, lastIncorrectIndex)
			: null;

	let restOfText = null;
	if (!correctTypedText && !incorrectTypedText) restOfText = fetchedJokes;
	if (correctTypedText && incorrectTypedText)
		restOfText = fetchedJokes.slice(lastIncorrectIndex); // slice from lastIncorrectIndex until the end of the string
	if (correctTypedText && !incorrectTypedText)
		restOfText = fetchedJokes.slice(lastCorrectIndex);
	if (!correctTypedText && incorrectTypedText)
		restOfText = fetchedJokes.slice(lastIncorrectIndex);

	useEffect(() => {
		if (
			!(
				prevLastCorrectIndexRef.current !== undefined &&
				lastIncorrectIndex !== undefined
			)
		) {
			prevLastCorrectIndexRef.current = lastCorrectIndex;
		}
	}, [lastCorrectIndex]);

	console.log('------------------------------------------');
	console.log('isGameStarted ', isGameStarted);
	console.log('correctTypedText.length', correctTypedText?.length);
	console.log('fetchedJokes.length', fetchedJokes.length);
	console.log('CorrectTypedText --> ', correctTypedText);
	console.log('IncorrectTypedText --> ', incorrectTypedText);
	console.log('Rest of the Text --> ', restOfText);
	console.log('------------------------------------------');

	useEffect(() => {
		textareaRef.current && textareaRef.current.focus();
	}, [isGameStarted]);

	function startCountdown() {
		setIsGameStarted(true);
	}

	function getPercentage() {
		if (correctTypedText) {
			return ((correctTypedText.length / fetchedJokes.length) * 100).toFixed(2);
		}
		return 0;
	}

	function getWordsPerMinute() {
		if (correctTypedText) {
			return (correctTypedText.length / 5).toFixed(1);
		}
		return 0;
	}
	function getWordsPerSecond() {
		if (correctTypedText) {
			return (correctTypedText.length / 5 / 60).toFixed(1);
		}
		return 0;
	}

	if (isLoading)
		return (
			<div className="loading">
				<div>Loading... Get Ready!</div>
			</div>
		);
	if (error) {
		console.log(error);
		return (
			<h1>
				Oops something happended, please try reloading, or come back later...
			</h1>
		);
	}
	console.log(gameOver);
	if (gameOver) {
		return (
			<GameOver
				gameTimer={gameTimer}
				getPercentage={getPercentage}
				getWordsPerSecond={getWordsPerSecond}
				getWordsPerMinute={getWordsPerMinute}
			/>
		);
	}
	//TODO: Make text of text-container not selectable, so that user can't copy the text and cheat!!!
	return (
		<div className="typer-conatiner">
			{!isGameStarted ? (
				<CountdownAnimation startCountdown={startCountdown} />
			) : (
				<main>
					<Navbar />
					<h1>Typer</h1>
					<div className="container">
						<div className="text-container">
							{correctTypedText && (
								<span
									style={{ backgroundColor: CORRECT_TEXT_BACKGROUND_COLOR }}
								>
									{correctTypedText}
								</span>
							)}
							{incorrectTypedText && (
								<span
									style={{ backgroundColor: INCORRECT_TEXT_BACKGROUND_COLOR }}
								>
									{incorrectTypedText}
								</span>
							)}
							{restOfText && <span>{restOfText}</span>}
						</div>

						<div className="timer-container">Timer: {gameTimer}</div>

						<ProgressBar
							correctTypedTextLength={
								correctTypedText ? correctTypedText.length : null
							}
							jokesLettersLength={fetchedJokes.length}
						/>

						<textarea
							ref={textareaRef}
							onChange={e => setUserTypedValue(e.target.value)}
						></textarea>
					</div>
				</main>
			)}
		</div>
	);
}

export default Typer;
