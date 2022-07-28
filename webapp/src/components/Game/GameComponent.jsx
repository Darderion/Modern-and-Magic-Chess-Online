import React, { useContext, useMemo } from 'react';
import { ConnectorContext } from '../../Connector';
import BoardComponent from '../Board/BoardComponent';
import * as Chess from 'chess.js'
import './styles.css'

const GameComponent = ({skins}) => {
    const { lobbyData, boardData, sendMessage } = useContext(ConnectorContext);
    const chess = new Chess()
    return useMemo(
        () => {
            return (
                <div className='wrapper'>
                    <div className='window'>
                        <div className='left-container'>
                        <div className='board-container'>
                            <BoardComponent chess={chess} view='white' skins={skins} />
                        </div>
                        </div>
                        <div className='right-container'>
                            <div className='info'>
                                <div className='block'>Current Turn: White</div>
                                <div className='block'>Surrender</div>
                            </div>
                            <div className='text-block'>
                                <p>Player1: Hello there.</p>
                                <p>Player2: General Kenobi!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }, [boardData, lobbyData]
    )
}

export default GameComponent;
