import React, { useContext, useMemo } from 'react';

import { ConnectorContext } from '../../Connector';

export default function Game({ startData }) {
  const { gameData, sendMessage } = useContext(ConnectorContext);

  function callback() {
      sendMessage({ "type": "allLobbies" });
  }

  return useMemo(
      () => {
          return (
              <div>
                  <h1>Connector Example</h1>
                  <div>{JSON.stringify(gameData)}</div>
                  <div className="start__data">{startData}</div>
                  <button onClick={callback}>Subscribe</button>
              </div>
          )
      }, [gameData]
  );
}
