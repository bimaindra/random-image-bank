import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
	gtmId: process.env.REACT_APP_GTM_ID,
	auth:
		process.env.NODE_ENV === 'production'
			? process.env.REACT_APP_GTM_AUTH_PRODUCTION
			: process.env.REACT_APP_GTM_AUTH_DEVELOPMENT,
	preview:
		process.env.NODE_ENV === 'production'
			? process.env.REACT_APP_GTM_PREVIEW_PRODUCTION
			: process.env.REACT_APP_GTM_PREVIEW_DEVELOPMENT
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
