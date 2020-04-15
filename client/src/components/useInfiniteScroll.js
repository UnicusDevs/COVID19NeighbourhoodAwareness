import { useEffect, useState } from 'react'
import axios from 'axios'

// Need to know which page number we're on
const useInfiniteScroll = (pageNumber) => {
	const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState([])
  const [hasMore, setHasMore] = useState(false)
	

	// every time pageNumber changes, do this
	useEffect(() => {
		//every time we make a request, set loading to true
		setLoading(true)
		axios({
			method: 'GET',
			url: `http://localhost:5000/post/limit?page=1&limit=5`,
		}).then(res => {
			//set state for our posts, using function version of setting state
			setPosts(prevPosts => {
				//return our previous posts combined with new posts
				console.log(res.data.results)
				return [...prevPosts, ...res.data.results]
			})
			setPage(prevPage => {
				console.log(res.data.results.page)
				return [...prevPage, res.data.results.page]
			})
			setHasMore(res.data.results.length > 0)
			setLoading(false)
		}).catch(err => {
			console.log(err)
		})
	}, [])
	
	// return to our user
	return { loading, posts, hasMore, page }

}

export default useInfiniteScroll