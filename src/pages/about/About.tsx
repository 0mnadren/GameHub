import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './about.css';

function About() {
	return (
		<div className="about-container">
			<main>
				<Navbar />
				<h1>Hi, my name is Nemanja Davidović</h1>
				<p>
					I'm a FullStack developer with a passion for building and
					experimenting with new technologies. With experience primarly in
					Python/Django, but also with JavaScript/React, I specialize in
					creating dynamic, user-friendly web applications.
				</p>
				<p>
					{' '}
					I'm proud of GameHub, a project I built exclusively with front-end
					technologies to showcase my skills and love for gaming. As a
					self-driven learner, I'm always exploring new techniques and tools to
					improve my craft.{' '}
				</p>
				<p>
					{' '}
					I invite you to check out my{' '}
					<Link
						to="https://nemanjadavidovic.pythonanywhere.com/"
						target={'_blank'}
					>
						portfolio
					</Link>{' '}
					to see more of my work, and feel free to reach out if you're
					interested in collaborating or learning more about my process. Thank
					you for stopping by!
				</p>
			</main>
		</div>
	);
}

export default About;
