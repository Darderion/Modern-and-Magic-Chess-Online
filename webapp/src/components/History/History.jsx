import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GameCard from "./GameCard";
import './history.css';


const History = function () {

    async function get(url) {
        const req = await axios.get(url);
        console.log(req.data);
        setData(req.data.map(game => <GameCard game={game}/>));
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        get("http://localhost:5000/api/history/getForAll").then(r => console.log(r.data));
    }, []);

    return (
        <div>
            <h1>History page</h1>
            <dir id="game-container">
                <dir className="game-card">
                    <dir>Game id:</dir>
                    <dir>First player (white):</dir>
                    <dir>Second player (black):</dir>
                    <dir>Result:</dir>
                </dir>
                { data }
            </dir>
        </div>
    );
};

export default History;