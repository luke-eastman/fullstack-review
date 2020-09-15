const express = require('express');
let app = express();
let helpers = require('../helpers/github')
let db = require('../database/index')
app.use(express.static(__dirname + '/../client/dist'));

app.use(express.urlencoded({
  extended: true
}));

app.post('/repos', function (req, res) {
  helpers.getReposByUsername(req.body.username, (err, repos) => {
    db.save(repos)
    .then(() => {
      console.log(repos)
      res.send();
    });
  });


});

app.get('/repos', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('ready to get')
  db.fetchTopRepos((repos) => {;
    console.log('this is happening');
    res.send(repos);
  });


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

