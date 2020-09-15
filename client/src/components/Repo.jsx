import React from 'react';

const Repo = ({repo}) => (
  <div>
    <h4>{repo.name}</h4>
    <div>{repo.url}</div>
    <div>{repo.popularity}</div>
  </div>
);

export default Repo