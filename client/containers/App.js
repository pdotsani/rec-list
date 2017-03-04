import React, { Component } from 'react'

export default class App extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<h2>Rec-List</h2>
						</div>
						<ul className="nav navbar-nav navbar-right">
							<li><a href="/oauth/logout">logout</a></li>
						</ul>
					</div>
				</nav>
				<div className="container-fluid" style={{ paddingTop: '60px' }}>
					{this.props.children}
				</div>
			</div>
		)
	}
}