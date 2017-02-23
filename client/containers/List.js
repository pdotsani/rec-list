import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

export default class List extends Component {

	constructor(props) {
		super(props);
		this.state = { loading: false, listings: [] }

		this.loadListings = this.loadListings.bind(this);
		this.deleteRelease = this.deleteRelease.bind(this);
	}

	componentDidMount() {
		this.loadListings();
	}

	loadListings() {
		this.setState({ loading: true });
		fetch('/api/collection/me', { credentials: 'same-origin' })
			.then(res => res.json())
			.then(json => {
				this.setState({
					folder: json.folder,
					pagination: json.pagination,
					listings: json.listings,
					loading: false 
				});
				console.log(this.state)
			})
			.catch(err => console.error(err));
	}

	deleteRelease(id, idx) {
		console.log('id: ', id);
		fetch(`/api/collection/${id}`, {
				method: 'delete',
				credentials: 'same-origin'
			})
			.then(res => {
				console.log('in delete');
				this.setState({
					listings: [...this.state.listings.slice(0, idx),
						...this.state.listings.slice(idx+1)]
				})
			})
			.catch(err => console.error(err))
	}

	render() {
		return (
			<ul className="list-unstyled text-center" style={{ marginTop: '50px' }}>
				{this.state.listings.map((listing, idx) =>
					<li key={idx} style={{ marginTop: '5px',
						fontSize: '30px', borderBottom: '1px dashed grey' }}
						className="col-md-4 col-md-offset-4 col-sm-12">
						{listing.release.description}
						 <button className="btn btn-sm" style={{ marginLeft: '15px' }}
							onClick={this.deleteRelease.bind(this, listing.id, idx)}>
							Delete</button>
					</li>
				)}
			</ul>
		)
	}
}