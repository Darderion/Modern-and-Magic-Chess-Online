import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Connector } from './Connector'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Connector>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Connector>

);
