import React, { Component } from 'react'
import { Link } from 'react-router'
import Modal from 'react-modal'
import fetch from 'isomorphic-fetch'

import Pagination from '../components/Pagination'

export default class List extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			loading: false,
			listings: [],
			current: 1,
			confirmModal: false,
			toggledId: '',
			toggleIdx: '',
			toggleDesc: '',
			pagination: {}
		}

		this.loadListings = this.loadListings.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.deleteRelease = this.deleteRelease.bind(this)
	}

	componentDidMount() {
		this.loadListings(1)
	}

	loadListings(p) {
		console.log('loading')
		this.setState({ loading: true });
		fetch(`/api/collection/me/${p}`, { credentials: 'same-origin' })
			.then(res => res.json())
			.then(json => {
				this.setState({
					folder: json.folder,
					pagination: json.pagination,
					listings: json.listings,
					loading: false 
				})
			})
			.catch(err => console.error(err))
	}

	openModal(id, idx, desc) {
		this.setState({ 
			confirmModal: true,
			toggledId: id,
			toggleIdx: idx,
			toggleDesc: desc
		})
	}

	closeModal() {
		this.setState({ confirmModal: false })
	}

	deleteRelease() {
		let id = this.state.toggledId
		let idx = this.state.toggleIdx
		console.log('id: ', id);
		fetch(`/api/collection/${id}`, {
				method: 'delete',
				credentials: 'same-origin'
			})
			.then(res => {
				this.setState({
					listings: [...this.state.listings.slice(0, idx),
						...this.state.listings.slice(idx+1)],
						confirmModal: false
				})
			})
			.catch(err => console.error(err))
	}

	render() {

		let customStyles = {
		  content : {
		    top: '50%',
		    left: '50%',
		    right: 'auto',
		    bottom: 'auto',
		    marginRight: '-50%',
		    transform: 'translate(-50%, -50%)'
		  }
		}

		return (
			<div>
				<Modal
					isOpen={this.state.confirmModal}
					contentLabel='Delete Listing?'
					style={customStyles}>
					<h3>Delete - <small>{this.state.toggleDesc}</small>?</h3>
					<button className="btn btn-danger"
						onClick={this.deleteRelease}>
						Yes!</button>
					<button className="btn btn-default"
						onClick={this.closeModal}>No</button>
				</Modal>
				<ul className="list-unstyled text-center" style={{ marginTop: '50px' }}>
					{this.state.listings.map((listing, idx) =>
						<li key={idx} style={{ marginTop: '5px',
							fontSize: '30px', borderBottom: '1px dashed grey' }}
							className="col-md-4 col-md-offset-4 col-sm-12">
							{listing.release.description}
							 <button className="btn btn-sm" style={{ marginLeft: '15px' }}
								onClick={this
									.openModal
									.bind(this, listing.id, idx, listing.release.description)}>
								Delete</button>
						</li>
					)}
				</ul>
				<Pagination current={this.state.current}
					loadListings={this.loadListings}
					pages={this.state.pagination.pages}></Pagination>
			</div>
		)
	}
}
