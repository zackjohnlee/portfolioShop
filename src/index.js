import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<p style={{color: "white"}}>hi nate!</p> , document.getElementById('root'));
registerServiceWorker();
