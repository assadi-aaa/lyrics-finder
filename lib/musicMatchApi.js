const helpers = require('./helpers');

let config = {};

/**
 * Search for track
 * @param title
 * @returns {Promise} promise
 */

const search = (title) => {
  const params = {
    q_track: title,
    apikey: config.key
  };
  return helpers.doRequest(config.url, 'track.search', params).then((res) => res.data.message.body.track_list)
    .then(prepareTracks);
};


/**
 * Get the lyrics of a track
 * @param trackId
 * @returns {Promise} promise
 */

const getLyrics = (trackId) => {
  const params = {
    track_id: trackId,
    apikey: config.key
  };

  return helpers.doRequest(config.url, 'track.lyrics.get', params).then((res) => res.data.message.body.lyrics)
    .then(prepareLyrics);

};


const prepareTracks = (trackList) => {
  if (!trackList) {throw (new Error('Not found'));}
  return trackList.map((t) => ({
    track_id: t.track.track_id,
    track_name: t.track.track_name
  }))
};
const prepareLyrics = (lyrics) => {
  if (!lyrics) {throw (new Error('Not found'));}
  return {
    lyrics_id: lyrics.lyrics_id,
    lyrics_body: lyrics.lyrics_body
  }
};


function musicMatch(conf) {
  config = conf;
  return {
    search,
    getLyrics
  }
}

module.exports = musicMatch;


