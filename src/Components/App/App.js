import React, { Component } from 'react';
import './App.css';
// import all needed Components and modules here
import Spotify from '../../util/Spotify.js';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

// This component will import SearchBar, SearchResults, and Playlist
// How do the states of these interact?

// Understand the difference between track and playlistTrack

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Chill',
      playlistTracks: [
        {
          name: 'Misty',
          artist: 'Caamp',
          album: 'Caamp'
        },
        {
          name: 'Astrovan',
          artist: 'Mt. Joy',
          album: 'Astrovan'
        },
        {
          name: 'Brokedown Palace',
          artist: 'Grateful Dead',
          album: 'American Beauty'
        }]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
    .then(searchResults => this.setState({
      searchResults: searchResults
    }));
  }

  savePlaylist(playlistName) {
    const trackURIs = this.state.playlistTracks.map(playlistTrack => {
      playlistTrack.uri
    });

    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      searchResults: []
    });
    this.updatePlaylistName(playlistName);
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => {
        !playlistTrack.id === track.id
      })
    })
  }

  addTrack(track) {
    if(!this.state.playlistTracks.find(playlistTrack => {
      playlistTrack.id === track.id
    })) {
      this.setState(prevState => {
        playlistTracks: [...prevState.playlistTracks, track]
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
