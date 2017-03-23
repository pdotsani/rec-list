import React from 'react'

const Listings = (props) => (
	<ul className="list-unstyled text-center" style={{ marginTop: '50px' }}>
		{props.listings.map((listing, idx) =>
			<li key={idx} style={{ marginTop: '5px',
				fontSize: '30px', borderBottom: '1px dashed grey' }}
				className="col-md-4 col-md-offset-4 col-sm-12">
				{listing.release.description}
				 <button className="btn btn-sm" style={{ marginLeft: '15px' }}
					onClick={props
						.openModal
						.bind(this, listing.id, idx, listing.release.description)}>
					Delete</button>
			</li>
		)}
	</ul>
)

Listings.propTypes = {
	listings: React.PropTypes.array,
	openModal: React.PropTypes.func
}

export default Listings
