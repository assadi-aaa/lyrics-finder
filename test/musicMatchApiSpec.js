const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const MusicMatch = require('../lib/musicMatchApi');
const helpers = require('../lib/helpers');
const StaticData = require('./data');
const Helpers = require('../lib/helpers');


const musicMatch = new MusicMatch(StaticData.config);

describe('MusicMatch',function () {

  it('should be function',function () {
    expect(MusicMatch).to.be.a('function');
  });

  it('should has method search',function () {
    expect(musicMatch).to.have.property('search');
  });

  it('should has method search',function () {
    expect(musicMatch).to.have.property('getLyrics');
  });

});

describe('#search', function () {


  afterEach(function () {
    sinon.restore();
  });

  it('Should be a function', function () {
    expect(musicMatch.search).to.be.a('function');
  });

  it('should return good response', function (done) {

    var mock = sinon.mock(Helpers);
    mock.expects('doRequest')
      .once()
      .withArgs(StaticData.config.url, 'track.search', {
        q_track: 'a',
        apikey: StaticData.config.key
      })
      .resolves(StaticData.searchResponse);

    musicMatch.search('a').then((res) => {
      expect(res).to.be.an('array');
      expect(res.length).to.be.equal(2);
      expect(res[0].track_name).to.be.equal('track1');
      done();
      mock.verify();
      mock.restore();
    });

  });


});

describe('#getLyrics', function () {

  afterEach(function () {
    sinon.restore();
  });

  it('Should be a function', function () {
    expect(musicMatch.getLyrics).to.be.a('function');
  });

  it('should return good response', function (done) {
    const stub = sinon.stub(helpers, 'doRequest');
    stub.resolves(StaticData.lyricsResponse);
    musicMatch.getLyrics('2032445').then((res) => {
      expect(res).to.have.property('lyrics_id');
      expect(res).to.have.property('lyrics_body');
      expect(res.lyrics_id).to.be.eql(3224050);
      expect(res.lyrics_body).to.not.be.empty;
      done();
    })
  });

});
