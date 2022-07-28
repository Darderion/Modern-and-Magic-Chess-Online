import React from 'react';

import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Navbar, Container, Nav as NavComponent } from 'react-bootstrap';
import './Nav.css'
import SignUpIn from '../SignUpIn/SignUpIn';
import axios from 'axios';
import config from '../../config';

const showLoginType = config.client.showLoginType;
const regUrl = config.server.serverURL + config.server.registerFolder;
const loginUrl = config.server.serverURL + config.server.loginFolder;

function signOut() {
	// TODO make sign out later;
	console.log('sign out');
}

export default function Nav({ isAuthenticated }) {
	const [show, setShow] = useState(showLoginType.none);
	const closeAll = () => setShow(() => showLoginType.none);

	const signUpHandler = (data) => {
		axios.post(regUrl, data)
		.then(res => {
			const userId = res?.data?.id;
			alert('User added with id: ' + userId);
			closeAll();
		})
		.catch(err => {
			const message = err?.response?.data?.message;
			alert(message ? message : 'Something went wrong!');
		});
	}

	const signInHandler = (data) => {
		axios.post(loginUrl, data)
    .then(res => {
      console.log(res);
			const accToken = res?.data?.accessToken;
			// TODO setCookie access; and use it in other parts of app
			console.log(accToken);
    })
    .catch(err => {
      console.log(err);
      const message = err?.response?.data?.message;
      alert(message ? message : 'Something went wrong!');
    });
	}
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#">Navbar</Navbar.Brand>
				<NavComponent className="me-auto">
					<NavComponent.Link as={Link} to="/" onClick={closeAll}>
						Home
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/Lobby" onClick={closeAll}>
						Lobby
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/Inventory" onClick={closeAll}>
						Inventory
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/About" onClick={closeAll}>
						About
					</NavComponent.Link>
				</NavComponent>
				<div className="login__btns">
				{isAuthenticated?  
					<div className="authoff">
						<Link to='/'>
							<button onClick={signOut}>Sign out</button>
						</Link>
					</div> : 
					<div className="authon">
						<button onClick={() => setShow(() => showLoginType.signUp)}>
							Sign Up
						</button>
						<button onClick={() => setShow(() => showLoginType.signIn)}>
							Sign In
						</button>
					</div> }
					<div className="absolute">
						{show === showLoginType.signUp ? 
							<SignUpIn closeSelf={ closeAll } submitText="Sign up" workWithData={signUpHandler}></SignUpIn> : ''}
						{show === showLoginType.signIn ? 
							<SignUpIn closeSelf={ closeAll } submitText="Sign in" workWithData={signInHandler}></SignUpIn> : ''}
					</div>
				</div>
			</Container>
		</Navbar>
	);
}
