import Header from '../Header';
import Footer from '../Footer';

const Main = (props) => {
	return (
		<>
			<Header />
			<main className='main-container pt-20'>
				<div className='container mx-auto px-4'>{props.children}</div>
			</main>
			<Footer />
		</>
	);
};

export default Main;
