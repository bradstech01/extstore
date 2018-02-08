import React from 'react';
import ReactDOM from 'react-dom';
import ExtensionPage from './ExtensionPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ExtensionPage url='http://localhost:3100/api/extensions' pollInterval={2000} />, document.getElementById('root'));
registerServiceWorker();
