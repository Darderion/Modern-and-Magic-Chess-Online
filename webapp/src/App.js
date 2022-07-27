import './App.css';
import { Nav } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './routes/About/About'
import Main from './routes/Main/Main'
import Inventory from './routes/Inventory/Inventory';
import Lobby from './routes/Lobby/Lobby';
import LobbyInfo from './routes/Lobby/lobbyInfo';
import ConnectorExample from './routes/ConnectorExample/ConnectorExample';

import 'bootstrap/dist/css/bootstrap.min.css';

const lobbies = Array.from({length: 16}).map((_, i) => {
	return LobbyInfo(i, `Ivan${i}`, `Lobby for Ivan #${i}`) 
});
lobbies.push(LobbyInfo(16, 'Ivan Copolach 3232342', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'));

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Nav></Nav>
				<Routes>
					<Route path="/" element={<Main></Main>}></Route>
					<Route path="/about" element={<About></About>}></Route>
					<Route path="/inventory" element={<Inventory></Inventory>}></Route>
					<Route path="/lobby" element={<Lobby lobbies={lobbies}></Lobby>}></Route>
					<Route path="/about" element={<About></About>}></Route>
					<Route path="/ConnectorExample" element={<ConnectorExample></ConnectorExample>}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
