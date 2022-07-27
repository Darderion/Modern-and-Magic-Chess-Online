import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DocumentTitle from 'react-document-title';

import { Connector } from './Connector'

const root = ReactDOM.createRoot(document.getElementById('root'));
const title = "MaMCO - Modern and Magic Chess Online";
// pechenux: Почему бы не задать заголовок просто в index.html?
root.render(
    <Connector>
      <DocumentTitle title={title}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
      </DocumentTitle>
    </Connector>,
);
