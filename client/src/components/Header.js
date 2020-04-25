import React, { useEffect } from "react"
import { Link } from 'react-router-dom';

// Redux 
import { connect } from 'react-redux';
import { togglePopUpOnSignUp, togglePopUpOnLogin, togglePopUpOffLogin, togglePopUpOffSignUp } from "./../redux/actions/popUpActions";
import { setCurrentUser } from './../redux/actions/userActions';
import { saveLatestPostDataToStore, saveAllPostsDataToStore, saveFilteredPostsToStore } from './../redux/actions/postActions';

//Styles
import styles from '../sass/components/Header.module.scss';

// API Calls
import { getUserPosts, getAllPosts } from './../api/handlePost';
import { getCurrentUser } from './../api/getUserData';
import jwt from 'jsonwebtoken'
import axios from 'axios';


const Header = (props) => {

  useEffect(() => {
    onLoad();
  }, []);

  // The below gets the following data: 1. current user 2. currentUsers latest post 3. All posts
  // All data is saved to the redux store.
  async function onLoad() {

    let userId = "";

    await getCurrentUser().then((response) => {
      userId = response.data.id
      jwt.decode(response.config.headers.Authorization)
      props.setCurrentUser(response.data);

      // The below makes a get to retrieve all latest posts.
      return getUserPosts(userId)
    }).then(axios.spread((latestPosts, userSuburbPosts) => {
      props.saveLatestPostDataToStore(latestPosts.data)
      props.saveFilteredPostsToStore(userSuburbPosts.data)
    })).catch((err) => {
      props.saveLatestPostDataToStore(null)
      props.setCurrentUser(null);
    });

    getAllPosts().then(async (response) => {
      const posts = response.data;
      await props.saveAllPostsDataToStore(posts);
    }).catch((err) => {
      props.saveAllPostsDataToStore([]);
    })
  };

  const handleSignOut = () => {
    const now = new Date()
    now.setTime(now.getTime() - 1)
    document.cookie = `covid19Project=;expires=${now.toUTCString()};path=/`;
    props.setCurrentUser(null);
    return window.location.reload();
  }

  // The below handles the pop up for signup. More can be found in the signup Form.
  const handleTogglePopUpOnSignUp = () => {
    props.togglePopUpOffLogin()
    props.togglePopUpOnSignUp()
  };

  // The below handles the pop up for the login. More can be found in the login form.
  const handleTogglePopUpOnLogin = () => {
    props.togglePopUpOffSignUp()
    props.togglePopUpOnLogin()
  };

  const handleHeaderDisplay = (currentUser) => {
    if (!props.currentUser) {
      return (
        <header>
          <div className={styles.container}>
            <div className={styles.innercontainer}>
              <div className={styles.logo}>
                <Link to="/">NeighboursBook</Link>
              </div>
              <div className={styles.navigation}>
                <nav>
                  <Link to={"/login"}>Log in</Link>
                  <Link to={"/signup"}>Sign up</Link>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )
    } else {
      return (
        <header>
          <div className={styles.container}>
            <div className={styles.innercontainer}>
              <div className={styles.logo}>
                <Link to="/">NeighboursBook</Link>
              </div>
              <div className={styles.navigation}>
                <nav>
                  <button className={styles.signOutButton} onClick={handleSignOut}>Log out</button>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )
    }
  };

  return (
    <div>
      {handleHeaderDisplay(props.currentUser)}
    </div>
  )
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    togglePopUpOnSignUp: () => dispatch(togglePopUpOnSignUp()),
    togglePopUpOffSignUp: () => dispatch(togglePopUpOffSignUp()),
    togglePopUpOnLogin: () => dispatch(togglePopUpOnLogin()),
    togglePopUpOffLogin: () => dispatch(togglePopUpOffLogin()),
    setCurrentUser: (userData) => dispatch(setCurrentUser(userData)),
    saveLatestPostDataToStore: (latestPostData) => dispatch(saveLatestPostDataToStore(latestPostData)),
    saveAllPostsDataToStore: (allPostsData) => dispatch(saveAllPostsDataToStore(allPostsData)),
    saveFilteredPostsToStore: (filteredPosts) => dispatch(saveFilteredPostsToStore(filteredPosts))
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);