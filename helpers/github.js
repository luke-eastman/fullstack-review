const axios = require('axios');
//const config = require('../config.js');

var token = process.env.TOKEN //|| config.TOKEN;

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    method: 'GET',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  axios(options)
  .then(response => {
    var repos = [];
    response.data.forEach(repo => {
      repos.push({
        name: repo.name,
        url: repo.html_url,
        forks: repo.forks_count
      });
    });
    callback(null, repos);
  });



}

module.exports.getReposByUsername = getReposByUsername;