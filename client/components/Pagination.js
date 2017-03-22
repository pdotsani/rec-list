import React, { Component } from 'react'

export default class Pagination extends Component {
	
	constructor(props) {
		super(props)

		this.createPagination = this.createPagination.bind(this)
	}

	createPagination() {
		let numbers = []
		let prev = this.props.current - 1
		let next = this.props.current + 1

		numbers.push(<li className={'page-item' + (this.props.current === 1 ?
			' disabled' : '')} key={0}>
			<a onClick={this.props.current === 1 ? '' :
				this.props.loadListings.bind(this, prev)}>
				{'<<'}</a></li>)
		
		for(var i = 1; i <= this.props.pages; i++) {
			numbers.push(<li className={'page-item' + (i === this.props.current ?
				' disabled' : '')} key={i}>
				<a onClick={i === this.props.current ? '' :
					this.props.loadListings.bind(this, i)}>{i}</a></li>)
		}

		numbers.push(<li className={'page-item' + (this.props.current === this.props.pages ?
			' disabled' : '')} key={this.props.pages + 1}>
			<a onClick={this.props.current === this.props.pages ?
				'' : this.props.loadListings.bind(this, next)}>
				{'>>'}</a></li>)
		return <ul className="pagination pagination-lg">{numbers}</ul>
	}

	render() {
		return(
			<div className="row">
				<div className="col-md-offset-4 col-md-4 col-sm-12">
					{this.createPagination()}
				</div>
			</div>
		)
	}
}

Pagination.propTypes = {
	current: React.PropTypes.number,
	loadListings: React.PropTypes.func,
	pages: React.PropTypes.number,
}
