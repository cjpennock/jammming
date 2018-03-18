import React from 'react';
import './Track.css';

// going to get props from track later?

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	renderAction() {
		 if (this.props.onAdd) {
      		return <a className='Track-action' onClick={this.addTrack}>+</a>;
    		} else {
      	return <a className='Track-action' onClick={this.removeTrack}>-</a>;
	}
}

	render() {
		return(
			<div className="Track">
			  <div className="Track-information">
			    <h3>{this.props.track.name}</h3>
			    <p>{this.props.track.artist} | {this.props.track.artist}</p>
			  </div>
			  {this.renderAction}
			</div>
		);
	}
}

export default Track;