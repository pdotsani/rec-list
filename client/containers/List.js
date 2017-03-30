import React, { Component } from 'react'
import { Link } from 'react-router'
import Modal from 'react-modal'
import fetch from 'isomorphic-fetch'

import Pagination from '../components/Pagination'
import Listings from '../components/Listings'

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

	loadListings(pg) {
		console.log('loading')
		this.setState({ loading: true });
		fetch(`/api/collection/me/${pg}`, { credentials: 'same-origin' })
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.setState({
					current: json.current,
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
				<Listings listings={this.state.listings} 
					openModal={this.openModal} />
				<Pagination current={this.state.current}
					loadListings={this.loadListings}
					pages={this.state.pagination.pages} />
			</div>
		)
	}
}
