import React from 'react';

import { Link } from 'react-router-dom';

import { Navbar, Container, Nav as NavComponent } from 'react-bootstrap';

export default function Nav() {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#">Navbar</Navbar.Brand>
				<NavComponent className="me-auto">
					<NavComponent.Link as={Link} to="/">
						Home
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/Lobby">
						Lobby
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/Inventory">
						Inventory
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/About">
						About
					</NavComponent.Link>
					<NavComponent.Link as={Link} to="/ConnectorExample">
						Connector Example
					</NavComponent.Link>
				</NavComponent>
			</Container>
		</Navbar>
	);
}
