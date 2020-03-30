import React from 'react';

// Components
import LogStatus from './LogStatus';
import LogStatusButton from './LogStatusButton';

// Styles
import styles from './../sass/components/Feed.module.scss';

const Feed = (props) => {

  // To be put into redux store once database is hooked up
  const state = {
    firstName: "Max",
    date: "18th March 2020",
    suburb: "Hawthorn",
    imageURL: "https://api.adorable.io/avatars/285/abott@adorable.png",
    claps: 20
  };

  return (
    <div>
      <div className={styles.logFeedContainer}>
        <LogStatusButton />
        <LogStatus firstName={state.firstName} date={state.date} suburb={state.suburb} imageURL={state.imageURL} claps={state.claps} />
        <LogStatus firstName={state.firstName} date={state.date} suburb={state.suburb} imageURL={state.imageURL} claps={state.claps} />
        <LogStatus firstName={state.firstName} date={state.date} suburb={state.suburb} imageURL={state.imageURL} claps={state.claps} />
      </div>
    </div>
  );
}

export default Feed;