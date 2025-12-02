import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
registerServiceWorker();
