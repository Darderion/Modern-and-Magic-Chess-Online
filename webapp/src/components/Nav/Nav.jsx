import React from 'react';

import { useState, useRef, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Navbar, Container, Nav as NavComponent } from 'react-bootstrap';
import './Nav.css'
import SignUpIn from '../SignUpIn/SignUpIn';
import axios from 'axios';
import config from '../../config';
import accTokenFuncs from '../../sharedFuncs/accToken';
import { ConnectorContext } from '../../Connector';

const showLoginType = config.client.showLoginType;
const regUrl = config.server.serverURL + config.server.registerFolder;
const loginUrl = config.server.serverURL + config.server.loginFolder;

export default function Nav({ isAuth, setIsAuth }) {
	const { sendMessage } = useContext(ConnectorContext);
	const [show, setShow] = useState(showLoginType.none);
	const closeAll = () => setShow(() => showLoginType.none);
	const mainBarEl = useRef(null);
	const loginEl = useRef(null);

	const setLoginMargin = () => {
		if(loginEl.current)
			loginEl.current.style.marginTop =  mainBarEl.current.clientHeight - 40 + 'px';
	}

	const signOut = () => {
		accTokenFuncs.delToken();
		setIsAuth(() => false);
	}	

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
			if(res?.statusText === 'OK') {
				const accToken = res?.data?.accessToken;
				accTokenFuncs.setToken(accToken);
				//alert('Log in successfully');
				setIsAuth(() => true);
				setShow(showLoginType.none);
				console.log(accTokenFuncs.getToken())
				if(accTokenFuncs.isAuth())
    			sendMessage({type: 'accToken', data: accTokenFuncs.getToken()});
			}
    })
    .catch(err => {
      console.log(err);
      const message = err?.response?.data?.message;
      alert(message ? message : 'Something went wrong!');
    });
	}

	window.addEventListener('resize', setLoginMargin);
	return (
		<Navbar bg="dark" variant="dark">
			<Container ref={mainBarEl}>
				<Navbar.Brand href="#">Navbar</Navbar.Brand>
				<NavComponent className="me-auto">
					<NavComponent.Link as={Link} to="/" onClick={closeAll}>
						Home
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/Inventory" onClick={closeAll}>
						Inventory
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/About" onClick={closeAll}>
						About
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/ConnectorExample">
						Connector Example
					</NavComponent.Link>
				</NavComponent>
				<div className="login__btns" onClick={ setLoginMargin }>
				{isAuth?  
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
					<div className="absolute" ref={loginEl}>
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
