import React, { Component } from 'react';

export default class Login extends Component {
	render() {
		return (
			<div className="text-center" style={{ marginTop: '100px' }}>
				<h2>Welcome to Rec-List!</h2>
				<a href="/oauth/authorize" className="btn btn-default btn-lg">Login</a>
			</div>
		)
	}
}