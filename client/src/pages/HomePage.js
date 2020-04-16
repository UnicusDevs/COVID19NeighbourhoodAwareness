import React, {useState} from 'react';

// API Calls
import { getLimitedPosts } from './../api/handlePost';

// Components
import About from './../components/About';
import SignUpModule from './../components/SignUpModule';
import LoginModule from './../components/LoginModule';

// Redux
import { connect } from "react-redux";
import { addNewPostToAllPostStore } from './../redux/actions/postActions';

// CSS
import styles from './../sass/pages/HomePage.module.scss';


const HomePage = (props) => {

  const [pageNumber, setPageNumber] = useState(1);

  const onScroll = async (event) => {
    let element = event.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // const id = props.allPosts[props.allPosts.length -1]._id;

      setPageNumber(pageNumber + 1)
      console.log(pageNumber)
      await getLimitedPosts(pageNumber).then(async (response) => {
        const newPosts = response.data;
        props.addNewPostToAllPostStore(newPosts)
      }).catch((err) => {
        console.log(err)
      })
    }
  } 

  const handlePopUp = (displayPopUpLogin, displayPopUpSignUp) => {
    if (displayPopUpSignUp === true) {
      return (
        <div>
          <SignUpModule />
          <About />
        </div>
      )
    } else if (displayPopUpLogin === true) {
      return (
        <div>
          <LoginModule />
          <About />
        </div>
      )
    } else {
      return (
        <div>
          <About/> 
        </div>
      )
    }
  };

  return (
    <div className={styles.mainContainer} onScroll={onScroll}>
      {handlePopUp(props.displayPopUpLogin, props.displayPopUpSignUp)} 
    </div>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPostToAllPostStore: (newPost) => dispatch(addNewPostToAllPostStore(newPost)) 
  }
};

// Connects to redux store so don't need to import.
function mapStateToProps(state) {
  return {
    displayPopUpSignUp: state.popUpReducer.displayPopUpSignUp,
    displayPopUpLogin: state.popUpReducer.displayPopUpLogin
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

