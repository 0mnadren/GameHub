interface ProgressBarInterface {
	correctTypedTextLength: number | null;
	jokesLettersLength: number;
}

function ProgressBar({
	correctTypedTextLength,
	jokesLettersLength,
}: ProgressBarInterface) {
	let calculatePercentage = 0;
	if (correctTypedTextLength) {
		calculatePercentage = (correctTypedTextLength / jokesLettersLength) * 100;
	}
	console.log(calculatePercentage);

	return (
		<div className="progress-container">
			<div
				className="progress-bar"
				style={{ width: `${calculatePercentage}%` }}
			></div>
		</div>
	);
}

export default ProgressBar;
