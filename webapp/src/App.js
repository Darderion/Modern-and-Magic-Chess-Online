import './App.css';
import { Nav } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './routes/About/About'
import Main from './routes/Main/Main'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Nav></Nav>
				<Routes>
					<Route path="/" element={<Main></Main>}></Route>
					<Route path="/about" element={<About></About>}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
