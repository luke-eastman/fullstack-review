const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

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
  repos.forEach(repo => {
    var query = Repo.find({url: repo.url});
    query.exec((err, result) => {
      if (result.length === 0) {
        Repo.create({
          name: repo.name,
          url: repo.url,
          popularity: repo.forks
        });
      } else {
        Repo.updateOne({url: repo.url}, {
          popularity: repo.forks
        });
      }
    })

  })
}

let fetchTopRepos = (callback) => {
  var query = Repo.find({}).sort({popularity: -1}).limit(25);
  query.exec((err, repos) => {
    reposToRender = [];
    repos.forEach(repo => {
      reposToRender.push({
        name: repo.name,
        url: repo.url,
        popularity: repo.popularity
      })
    })
    callback(err, reposToRender);
  });

}

module.exports.save = save;
module.exports.fetchTopRepos = fetchTopRepos;