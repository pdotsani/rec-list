import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

export default class List extends Component {

	constructor(props) {
		super(props);
		fetch('/api/collection/me')
			.then(res => console.log('complete! - ', res))
			.catch(err => console.error(err));
	}

	render() {
		return (
			<div>
				<h2>Rec-list here...</h2>
			</div>
		)
	}
}