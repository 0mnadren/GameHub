import { Link } from 'react-router-dom';
import Home from '../pages/home/Home';
import './navbar.css';

function Navbar() {
	return (
		<nav>
			<ul>
				<Link to={'/'}>Home</Link>
				<Link to={'/score-board'}>Score Board</Link>
				<Link to={'/contacts'}>Contacts</Link>
			</ul>
		</nav>
	);
}

export default Navbar;
