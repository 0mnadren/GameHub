import { Link } from 'react-router-dom';
import './navbar.css';

interface NavbarInterface {
	hasScoreBoard?: boolean;
	rulesURL?: string;
	hardMode?: boolean;
}

function Navbar({
	hasScoreBoard = false,
	rulesURL,
	hardMode,
}: NavbarInterface) {
	return (
		<nav>
			<ul>
				<Link to={'/'}>Home</Link>
				{hasScoreBoard && <Link to={'/score-board'}>Score Board</Link>}
				{rulesURL && <Link to={rulesURL}>Rules</Link>}
				{hardMode === true && <Link to={`/typer?hard=${true}`}>Hard Mode</Link>}
				{hardMode === false && <Link to={`/typer`}>Normal Mode</Link>}
				<Link to={'/about'}>About</Link>
			</ul>
		</nav>
	);
}

export default Navbar;
