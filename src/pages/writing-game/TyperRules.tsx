import { Link } from 'react-router-dom';

function TyperRules() {
	return (
		<div>
			<h1>Typer Rules</h1>
			<Link to={'/typer'}>Easy</Link>
			<Link to={`/typer?hard=${true}`}>Hard</Link>
		</div>
	);
}

export default TyperRules;
