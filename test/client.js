const MusicMatchClient = require('../lib/client');
const StaticData = require('./data');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


const client = new MusicMatchClient(StaticData.config);


describe('Client', function () {

  it('Should be a function', function () {
    expect(MusicMatchClient).to.be.a('function');
  });

  it('instance should has 3 methods', function () {
    expect(client.searchTrack).to.be.a('function');
    expect(client.getLyricsTrack).to.be.a('function');
    expect(client.getLyricsTrackCallback).to.be.a('function');
  });

});


describe('#searchTrack', function () {


  afterEach(function () {
    sinon.restore();
  });

  it('Should be promise', function () {
    expect(client.searchTrack('title')).to.be.a('promise');
  });

  it('Should return track title not found', function () {
    expect(client.searchTrack).to.throw('track title not found');
  });


});


describe('#getLyricsTrackCallback', function () {
  it('Should return track id not found', function () {
    expect(client.getLyricsTrackCallback).to.throw('track id not found');
  });
});

process.on('unhandledRejection', (e) => {
});
