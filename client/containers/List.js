import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

export default class List extends Component {

	constructor(props) {
		super(props);
		this.state = { loading: false, releases: [] }
	}

	componentDidMount() {
		this.setState({ loading: true });
		fetch('/api/collection/me', { credentials: 'same-origin' })
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.setState({
					folder: json.folder,
					pagination: json.pagination,
					releases: json.releases,
					loading: false 
				});
			})
			.catch(err => console.error(err));
	}

	render() {
		return (
			<ul class="row" className="list-unstyled" style={{ marginTop: '50px' }}>
				{this.state.releases.map((release, idx) =>
					<li key={idx}
						className="col-md-4 col-md-offset-4 col-sm-12">
						{release.title} - {release.artist}</li>
				)}
			</ul>
		)
	}
}