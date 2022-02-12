import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Layout/main';
import Home from './pages/Home';
import About from './pages/About';

const App = () => {
	return (
		<Router>
			<Main>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/about' element={<About />} />
				</Routes>
			</Main>
		</Router>
	);
};

export default App;
