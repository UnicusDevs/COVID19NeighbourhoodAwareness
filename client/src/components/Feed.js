import React,  {useEffect, useState, useRef, useCallback } from 'react';

// Redux 
import {connect} from 'react-redux';

// API Calls
import axiosAPI from './../api/baseURL';
import { getAllPosts } from './../api/handlePost';

// Components
import LogStatus from './LogStatus';
import LogStatusButton from './LogStatusButton';
import useInfiniteScroll from './useInfiniteScroll';

// Styles
import styles from './../sass/components/Feed.module.scss';

const Feed = (props) => {

  const [allPostsArray, setAllPostsArray] = useState([])
  const [slicedPostsArray, setSlicedPostsArray] = useState([])
  const [pageNumber, setPageNumber] = useState(1)


  const {
    page,
    posts,
    hasMore,
    loading,
  } = useInfiniteScroll()


  // Incomplete infinite scroll hook using intersection observer api
  const observer = useRef()
  const lastPostElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('visible')
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)

  }, [loading, hasMore, page, posts]) 



  useEffect(() => {
    async function fetchAPI() {
      await axiosAPI.get('/post').then(async (response) => {
        const posts = response.data;
        console.log("posts", posts)
        setAllPostsArray(posts)
      }).catch((err) => {
        console.log(err)
      })
    };

    fetchAPI()
  }, []);


  // Incomplete fetching of paginated results hook
  // useEffect(() => {
  //   async function fetchAPI() {
  //     await axiosAPI.get('/post/limit?page=1&limit=5').then(async (response) => {
  //       const posts = response.data.results;
  //       const pageNumber = response.data.next.page;
  //       setSlicedPostsArray(posts)
  //       setPageNumber(pageNumber)
  //       console.log(pageNumber)
  //       console.log(posts)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   };

  //   fetchAPI()
  // }, []);


  const handleAllPosts = () => {

    const posts = allPostsArray.map((post, index) => {
    
      const userId = post.User;
      const claps = post.Claps;
      const createdAt = post.createdAt;
      const suburb = post.Suburb
      
      //Find last element in the array 
      if (allPostsArray.length === index + 1) {
        return  <div ref={lastPostElementRef} key={post._id}>
                  <LogStatus  user={userId} createdAt={createdAt} suburb={suburb} claps={claps} />
                </div>
      } else {
        return  <div key={post._id}>
                  <LogStatus  user={userId} createdAt={createdAt} suburb={suburb} claps={claps} />
                </div>
      }
    });
    return posts
  };

  return (
    <div className={styles.feed}>
      <div className={styles.logFeedContainer}>
        <LogStatusButton />
        {handleAllPosts()}
      
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  }
};

export default connect(mapStateToProps, null)(Feed);