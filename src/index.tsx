import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<Switch>
			<Route exact path="/" component={App} />
		</Switch>
	</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
