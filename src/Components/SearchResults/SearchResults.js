import React from 'react';
import './SearchResults.css';
// import Tracklist
import TrackList from '../TrackList/TrackList';

// We will be adding a TrackList component

class SearchResults extends React.Component {
	render() {
		return (
			<div className="SearchResults">
			  <h2>Results</h2>
			  <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}/>
			</div>
		);
	}
}

export default SearchResults;