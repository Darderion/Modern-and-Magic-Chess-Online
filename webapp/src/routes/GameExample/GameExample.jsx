import React from 'react'
import GameComponent from '../../components/Game/GameComponent'

export default function GameExample() {
    const pgn = [
      '[White "White Player"]',
      '[Black "Black Player"]',
      '',
      '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
      'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
      'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5'
    ];
  
  return (
    <GameComponent
        pgn={pgn.join('\n')}
        skins={{
            black: {
                bishop: 'default',
                king: 'wikipedia',
                knight: 'default',
                queen: 'default',
                pawn: 'wikipedia',
                rook: 'wikipedia',
            },
            white: {
                bishop: 'wikipedia',
                king: 'default',
                knight: 'wikipedia',
                queen: 'default',
                pawn: 'default',
                rook: 'wikipedia',
            },
        }}
        view="white"
    />
  )
}
