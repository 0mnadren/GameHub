import { useEffect } from 'react';

export default function useLogger(value: unknown) {
	useEffect(() => {
		console.log(value);
	}, [value]);
}
