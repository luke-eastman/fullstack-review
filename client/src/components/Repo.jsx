import React from 'react';

const Repo = ({repo}) => (
  <div>
    <div>Title: {repo.name}</div>
    <div>URL: {repo.url}</div>
    <div>Forks: {repo.popularity}</div>
  </div>
);

export default Repo;