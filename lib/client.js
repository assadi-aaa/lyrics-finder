const nconf = require('./setupNconf');
const MusicMatch = require('./musicMatchApi');
const API_KEY = nconf.get('MUSIC_MATCH_KEY');
const API_URL = nconf.get('MUSIC_MATCH_URL');


/**
 * Initializes the MusicMatch client
 * @param {object} config Configuration params
 * @param {string} config.api_key API Key
 * @param {string} config.base_uri Configuration params
 */

function MusicMatchClient(config = {}) {

    const reqConfig = {
        url: config.url ? nconf.set('MUSIC_MATCH_URL', config.url) : API_URL,
        key: config.key ? nconf.set('MUSIC_MATCH_KEY', config.key) : API_KEY
    };

    const musicMatch = new MusicMatch(reqConfig);

    /**
     * Search for track
     * @param title
     * @return {Promise} Array of tracks
     */

    const searchTrack = (title) => {
        if (!title) throw(new Error('track title not found'));
        return musicMatch.search(title);
    };


    /**
     * Get the lyrics of a track
     * @param id_track
     * @return {Promise} lyrics Object
     */

    const getLyricsTrack = (idTrack) => {
        if (!idTrack) throw (new Error('track id not found'));
        return musicMatch.getLyrics(idTrack);
    };

    /**
     * Get the lyrics of a track
     * @param idTrack
     * @param {function} fn Callback
     * @return {Object} lyrics Object
     */

    const getLyricsTrackCallback = (idTrack, fn) => {
        if (!idTrack) throw (new Error('track id not found'));
        musicMatch.getLyrics(idTrack).then(result => {
            return fn(null, result);
        }).catch(err => {
            return fn(err);
        });
    };


    return {
        ...reqConfig,
        searchTrack,
        getLyricsTrack,
        getLyricsTrackCallback
    };


}

module.exports = MusicMatchClient;


