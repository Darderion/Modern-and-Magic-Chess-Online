import './App.css';
import { Nav } from './components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './routes/Main/Main';
import Inventory from './routes/Inventory/Inventory';
import config from './config';
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

const accTokenCookie = config.client.accTokenCookie;

function App() {
	const [isAuth, setIsAuth] = useState(new Cookies().get(accTokenCookie));

	return (
		<BrowserRouter>
			<div className="App">
				<Nav isAuth={isAuth} setIsAuth={setIsAuth}></Nav>
				<Switch>
					<Route exact path="/" ><Main></Main> </Route>
					<Route exact path="/Inventory"><Inventory></Inventory></Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
