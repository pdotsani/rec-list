import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './containers/App'
import Login from './containers/Login'
import List from './containers/List'

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="login" component={Login} />
			<Route path="list" component={List} />
		</Route>
	</Router>
), document.getElementById('root'))