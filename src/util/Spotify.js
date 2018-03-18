const clientId = '7549815486624d96be07fe869f820ef3';
const redirectUrl = 'http://localhost:3000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`
 

let accessToken;
let expiresIn;

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		} 
		const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    	const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    	if (urlAccessToken && urlExpiresIn) {
    		accessToken = urlAccessToken[1];
    		expiresIn = urlExpiresIn[1];
    		window.setTimeout(() => 
    			accessToken = '', expiresIn * 1000);
    		window.history.pushState('Access Token', null, '/');
    	} else {
    		window.location = spotifyUrl;
    	}
	},

	savePlaylist(playlistName, trackUris) {
		// Where does trackUris come from?
		if(!playlistName || !trackUris || trackUris.length() === 0) return;
		
		const headers = {
			'Authorization': `Bearer ${accessToken}`
		};
		let userId;
		fetch('https://api.spotify.com/v1/me', {
			headers: headers
		}).then(response => response.json())
		.then(jsonResponse => {
			userId = jsonResponse.id;
		})
		.then(() => {
			const createPlaylistUrl = `/v1/users/${userId}/playlists1`;
			fetch(createPlaylistUrl, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({name: playlistName})
			})
		}).then(response => response.json())
		.then(jsonResponse => {
			playlistName = jsonResponse.id;
		})
		.then(() => {
			const addTrackUrl = `/v1/users/${userId}/playlists/${playlistName}/tracks`;
			fetch(addTrackUrl, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({uris: trackUris})
			})
		})

	},

	search(searchTerm) {
		const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
		return fetch(searchUrl, {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
		.then(response => response.json())
		.then(jsonResponse => {
			if (!jsonResponse.tracks) return [];
			return jsonResponse.tracks.items.map(track => {
				return {
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					uri: track.uri
				}
			})
				})
			}
};

module.exports = Spotify;