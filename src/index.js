import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';

// We just need to pass the store to the component, no Provider or connect here :)
ReactDOM.render(<App store={store} />, document.getElementById('root'));
