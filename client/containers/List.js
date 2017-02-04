import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

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
			<div>
				<h2>Rec-list here...</h2>
				{this.state.releases.map((release, idx) =>
					<div key={idx}>{release.title} - {release.artist}</div>
				)}
			</div>
		)
	}
}