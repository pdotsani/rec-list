import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch'

import App from './containers/App'
import Login from './containers/Login'
import List from './containers/List'

const isAuth = () => {
	return new Promise((resolve, reject) => {
		fetch('/oauth/is', { credentials: 'same-origin' })
			.then(res => res.json())
			.then(json => resolve(json))
			.catch(err => reject(err))	
	})
}

const toLogin = (nextState, replace, callback) => {
	isAuth()
		.then(result => {
			if(!result.isAuth) {
				replace('/login')
			}
			callback()
		})
}

const toApp = (nextState, replace, callback) => {
	isAuth()
		.then(result => {
			if(result.isAuth) {
				replace('/list')
			}
			callback()
		})
}

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="login" component={Login} onEnter={toApp} />
			<Route path="list" component={List} onEnter={toLogin} />
		</Route>
	</Router>
), document.getElementById('root'))