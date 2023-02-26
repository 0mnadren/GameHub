import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import './modal.css';

interface ModalProps {
	points: number;
	handleGameReset?: () => void;
}

function Modal({ points, handleGameReset }: ModalProps) {
	const [value, addValue] = useLocalStorage('color-game');
	const inputRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const input = inputRef.current && (inputRef.current as HTMLInputElement);
		if (input !== null || input !== undefined) {
			input.focus();
		}
	}, []);

	function handleSavePlayer(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			const input = e.target as HTMLInputElement;

			addValue({
				name: input.value,
				points,
			});
			setTimeout(() => {
				navigate('/score-board');
			}, 100);
		}
	}

	return (
		<>
			<div className="overlay"></div>
			<div className="modal-container">
				<h2>Your score is: {points}</h2>
				<p>Here you can enter your name to save your score:</p>
				<input
					onKeyDown={e => handleSavePlayer(e)}
					type="text"
					ref={inputRef}
					placeholder="Cool name..."
				/>
				<div className="buttons-container">
					<span>Thanks for playing!</span>
					<div>
						<Link to="/" className="btn">
							Home
						</Link>{' '}
						{/* <Link to="/color-game" className="action-btn">
							Play again
						</Link> */}
						{handleGameReset && (
							<button onClick={() => handleGameReset()} className="action-btn">
								Play Again
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Modal;
