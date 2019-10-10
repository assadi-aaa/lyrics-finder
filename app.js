const express = require('express');
const MusicMatchClient = require("./lib/client");

const app = express();


app.get('/', async (req, res) => {

     try {
         const client = new MusicMatchClient();
         client.getLyricsTrackCallback(null,function (a,b) {
             console.log(a,b);
             const songs = b;
             res.setHeader('Content-Type', 'application/json');
             res.send(songs.length == [{"track_id":"1","track_name":"track1"},{"track_id":"2","track_name":"track2"}].length)
         });

     } catch (e) {
         console.log('e', e)
     }


});

app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
});
