import React, { useContext, useMemo } from 'react';

import { ConnectorContext } from '../../Connector';

export default function Main() {
	const { lobbyData, sendMessage } = useContext(ConnectorContext);

	function callback() {
		sendMessage({ "type": "allLobbies" });
	}

	return useMemo(
		() => {
			return (
				<div>
					<h1>Main Page</h1>
					<div>{JSON.stringify(lobbyData)}</div>
					<button onClick={callback}>Subscribe</button>
				</div>
			)
		}, [lobbyData]
	);
}
