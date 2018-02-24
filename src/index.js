import React from 'react';
import ReactDOM from 'react-dom';
import ExtensionPage from './js/ExtensionPage';
import registerServiceWorker from './js/registerServiceWorker';

let apiURL = 'http://localhost:3100/api';

ReactDOM.render(<ExtensionPage url={apiURL} pollInterval={2000} />, document.getElementById('root'));
registerServiceWorker();
