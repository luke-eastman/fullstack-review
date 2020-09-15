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
  return new Promise((resolve, reject) => {
    repos.forEach(repo => {
      var query = Repo.find({url: repo.url});
      query.exec((err, result) => {
        if (result.length === 0) {
          console.log('creating')
          resolve(Repo.create({
            name: repo.name,
            url: repo.url,
            popularity: repo.forks
          }));
        } else {
          resolve(Repo.updateOne({url: repo.url}, {
            popularity: repo.forks
          }));
        }
      })
      console.log('inside')

    })
    console.log('then end');
  });
}

let fetchTopRepos = (callback) => {
  var query = Repo.find({}).sort({popularity: -1}).limit(25);
  query.exec((err, repos) => {
    console.log()
    reposToRender = [];
    repos.forEach(repo => {
      console.log('are there any repo')
      reposToRender.push({
        name: repo.name,
        url: repo.url,
        popularity: repo.popularity
      })
    })
   console.log('repos to ' , reposToRender)
  })
  .then(() => {
    console.log('repos to render ', reposToRender)
    callback(reposToRender);
  });
}

module.exports.save = save;
module.exports.fetchTopRepos = fetchTopRepos;