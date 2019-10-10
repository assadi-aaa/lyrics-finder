const nconf = require('nconf');
const {join, resolve} = require('path');

const PATH_TO_CONFIG = join(resolve(__dirname, '../config.json'));

const nconfig = nconf.argv()
  .env()
  .file({file: PATH_TO_CONFIG});

module.exports = nconfig;
