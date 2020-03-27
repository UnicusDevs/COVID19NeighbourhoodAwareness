import React from 'react';

// Components
import LogStatus from './LogStatus';

const Feed = (props) => {

  // To be put into redux store
  const state = {
    firstName: "Max",
    date: "18th March 2020",
    suburb: "Hawthorn",
    imageURL: "https://api.adorable.io/avatars/285/abott@adorable.png",
    claps: 20
  };

  return (
    <div>
      <LogStatus firstName={state.firstName} date={state.date} suburb={state.suburb} imageURL={state.imageURL} claps={state.claps} />
    </div>
  );
}

export default Feed;