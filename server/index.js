const express = require('express');
let app = express();
let helpers = require('../helpers/github')

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.urlencoded({
  extended: true
}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database


  helpers.getReposByUsername(req.body.username, (err, data) => {
    console.log(data);
  });


  console.log('hit /repos');
  res.send()
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

