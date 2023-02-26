import { useEffect, useState } from 'react';
import { INITIAL_TIMER_VALUE } from '../data/constants';

interface UseGameStartInterface {
	correctTypedText: string | null;
	fetchedJokes: string;
}

export default function useGameStart({
	correctTypedText,
	fetchedJokes,
}: UseGameStartInterface) {
	const [gameTimer, setGameTimer] = useState<number>(INITIAL_TIMER_VALUE);
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
	const [gameOver, setGameOver] = useState<boolean>(false);
	useEffect(() => {
		if (isGameStarted && gameTimer > 0) {
			if (
				typeof correctTypedText === 'string' &&
				correctTypedText.length === fetchedJokes.length
			) {
				setGameOver(true);
				setIsGameStarted(false);
				return;
			}
			const timer = setTimeout(() => {
				setGameTimer(gameTimer - 1);
			}, 1000);
			return () => clearTimeout(timer);
		} else if (gameTimer === 0) {
			setGameOver(true);
			setIsGameStarted(false);
		}
	}, [isGameStarted, gameTimer]);

	return { gameTimer, isGameStarted, setIsGameStarted, gameOver, setGameOver };
}
