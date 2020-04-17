import { useEffect, useState } from 'react'
import { getLimitedPosts } from './../api/handlePost';

export default function usePostFetch(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false)
	
	useEffect(async() => {
    setLoading(true)
    setError(false)
		await getLimitedPosts(pageNumber)
			.then(response => {
				setPosts(response.data)
				console.log(setPosts)
      	setHasMore(response.data.length > 0)
      	setLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }, [pageNumber])

  return { loading, error, posts, hasMore }
}