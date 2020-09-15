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
    Repo.create({
      name: repo.name,
      url: repo.url,
      popularity: repo.forks
    });
  })
}

module.exports.save = save;