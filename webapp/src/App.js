import './App.css';
import { Nav, BoardComponent } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './routes/About/About'
import Main from './routes/Main/Main'
import Board from './routes/Board [testing]/Board';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Nav></Nav>
				<Routes>
					<Route path="/" element={<Main></Main>}></Route>
					<Route path="/about" element={<About></About>}></Route>
					
					{/* Placeholder */}
					<Route path="/board" element={<Board />} /> 
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
