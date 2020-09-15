const mongoose = require('mongoose');
var dbUrl = process.env.DATABASE_URL || 'mongodb://localhost/fetcher'
mongoose.connect(dbUrl);

let repoSchema = mongoose.Schema({
  name: String,
  url: {type: String, unique: true},
  popularity: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return new Promise((resolve, reject) => {
    var count = 0;
    repos.map(repo => {
      var repoToSave = new Repo({
        name: repo.name,
        url: repo.url,
        popularity: repo.forks,
      });

      repoToSave.save((err) => {
        count++;
        if(count === repos.length) {
          resolve('success');
        }
      });

    });
  })
}

let fetchTopRepos = (callback) => {
  var query = Repo.find({}).sort({popularity: -1}).limit(25);
  query.exec((err, repos) => {
    console.log()
    reposToRender = [];
    repos.forEach(repo => {
      reposToRender.push({
        name: repo.name,
        url: repo.url,
        popularity: repo.popularity
      })
    })
  })
  .then(() => {
    callback(reposToRender);
  });
}

module.exports.save = save;
module.exports.fetchTopRepos = fetchTopRepos;