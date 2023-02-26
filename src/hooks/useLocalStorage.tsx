import { useEffect, useState } from 'react';

export default function useLocalStorage(
	key: string,
	initialValue: object[] = []
) {
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);
		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	const addValue = (newItem: object) => {
		setValue((prevValue: object[]) => [...prevValue, newItem]);
	};

	return [value, addValue];
}
