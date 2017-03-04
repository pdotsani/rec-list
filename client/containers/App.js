import React, { Component } from 'react'

const isAuth = () => {
	return new Promise((resolve, reject) => {
		fetch('/oauth/is', { credentials: 'same-origin' })
			.then(res => res.json())
			.then(json => resolve(json))
			.catch(err => reject(err))	
	})
}

export default class App extends Component {

	constructor(props) {
		super(props)
		this.state = { isAuth: false }
	}

	componentWillMount() {
		isAuth()
			.then(result => {
				if(!result.isAuth) {
					this.setState({ isAuth: false })
				} else {
					this.setState({ isAuth: true })
				}
			})
			.catch(err => console.error(err))
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<h2>Rec-List</h2>
						</div>
						{this.state.isAuth ? 
							<ul className="nav navbar-nav navbar-right">
								<li><a href="/oauth/logout">logout</a></li>
							</ul> : ''
						}
					</div>
				</nav>
				<div className="container-fluid" style={{ paddingTop: '60px' }}>
					{this.props.children}
				</div>
			</div>
		)
	}
}