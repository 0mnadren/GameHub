import { useEffect, useState } from 'react';

interface JokeInterface {
	setup: string;
	punchline: string;
}

export default function useFetch(url: string) {
	const [fetchedJokes, setFetchedJokes] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		console.log('data fetching ...');
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
				);
				setIsLoading(false);
			})
			.catch(error => {
				if (error.name === 'AbortError') {
					console.log('Request was cancelled');
				} else {
					setError(error);
				}
				setIsLoading(false);
			});
	}, []);

	return { fetchedJokes, isLoading, error };
}
