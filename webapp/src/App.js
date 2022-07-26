import './App.css';
import { Nav, /* BoardComponent */ } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './routes/About/About'
import Main from './routes/Main/Main'
import Board from './routes/Board [testing]/Board';
import Inventory from './routes/Inventory/Inventory';
import Lobby from './components/Lobby/Lobby';
import ConnectorExample from './routes/ConnectorExample/ConnectorExample';
import lobbyInfo from './components/Lobby/lobbyInfo';
import config from './config';
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const accTokenCookie = config.client.accTokenCookie;

const lobbies = Array.from({length: 16}).map((_, i) => {
	return lobbyInfo(i, `Ivan${i}`, `Lobby for Ivan #${i}`) 
});
lobbies.push(lobbyInfo(16, 'Ivan Copolach 3232342', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'));

function App() {
	const [isAuth, setIsAuth] = useState(new Cookies().get(accTokenCookie));
	return (
		<BrowserRouter>
			<div className="App">
				<Nav isAuth={isAuth} setIsAuth={setIsAuth}></Nav>
				<Routes>
					<Route path="/" element={<Main></Main>}></Route>
					<Route path="/about" element={<About></About>}></Route>
					{/* Placeholder */}
					<Route path="/board" element={<Board />} />
					<Route path="/inventory" element={<Inventory></Inventory>}></Route>
					<Route path="/about" element={<About></About>}></Route>
					<Route path="/ConnectorExample" element={<ConnectorExample></ConnectorExample>}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
