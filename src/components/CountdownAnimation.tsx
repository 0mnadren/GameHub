import { useEffect, useState } from 'react';
import './countdown.css';

interface StarGameInterface {
	startCountdown: () => void;
}

function CountdownAnimation({ startCountdown }: StarGameInterface) {
	const [countdown, setCountdown] = useState<number>(3);

	useEffect(() => {
		if (countdown > -1) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
		startCountdown();
	}, [countdown]);
	return (
		<div className="countdown-container">
			<div className="countdown-cirle" key={countdown}>
				<span>{countdown > 0 ? countdown : 'GO!'}</span>
			</div>
		</div>
	);
}

export default CountdownAnimation;
