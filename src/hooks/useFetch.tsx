import { useCallback, useEffect, useState } from 'react';
import JSONJokes from '../data/jokes.json';

interface JokeInterface {
	setup: string;
	punchline: string;
}

export default function useFetch(url: string) {
	const [fetchedJokes, setFetchedJokes] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		console.log('Data fetching ...');
		const abortController = new AbortController();
		const signal = abortController.signal;
		fetch(url, {
			signal,
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to fetch jokes');
				}
				return response.json();
			})
			.then(data => {
				const jokesArray = data.map(
					({ setup, punchline }: JokeInterface) => `${setup} ${punchline}`
				);
				setFetchedJokes(
					jokesArray
						.join(' ')
						.trim()
						.replace('’', "'")
						.replace('💘', '<3')
						.replace('ñ', 'n')
						.replace('“', '"')
				);
				setIsLoading(false);
			})
			.catch(error => {
				if (error.name === 'AbortError') {
					console.log('Request was cancelled');
				} else {
					setError(error);
					console.log(error);
				}
				setIsLoading(false);
				const jokesArray = JSONJokes.jokes.map(
					({ setup, punchline }: JokeInterface) => `${setup} ${punchline}`
				);
				setFetchedJokes(jokesArray.join(' '));
			});

		return () => {
			console.log('Canceling request ...');
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { fetchedJokes, setFetchedJokes, fetchData, isLoading, error };
}
