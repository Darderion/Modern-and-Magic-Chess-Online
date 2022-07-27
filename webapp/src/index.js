import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DocumentTitle from 'react-document-title';

const root = ReactDOM.createRoot(document.getElementById('root'));
const title = "MaMCO - Modern and Magic Chess Online";
root.render(
    <DocumentTitle title={title}>
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    </DocumentTitle>
);
