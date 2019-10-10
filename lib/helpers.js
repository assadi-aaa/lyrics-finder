const axios = require('axios');

const doRequest = (host, url, params) => {
  const instance = axios.create({
    baseURL: host
  });
  return instance.get(url, {
    params: params,
  })
};

module.exports = {
  doRequest
};

