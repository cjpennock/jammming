import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

// Why are we able to use this.props here? Where are the props set within the parent?

class TrackList extends React.Component {
	render() {
		return(
			<div className="TrackList">
				{this.props.tracks.map(track => {
					<Track key={track.id} track={track} onRemove={this.props.onRemove} onAdd={this.props.onAdd} />
				})}
			</div>
		);
	}
}

export default TrackList;