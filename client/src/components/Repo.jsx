import React from 'react';

const Repo = ({repo}) => (
  <div>
    <a href={repo.url}>Title: {repo.name}</a>
    <div>Forks: {repo.popularity}</div>
  </div>
);

export default Repo;