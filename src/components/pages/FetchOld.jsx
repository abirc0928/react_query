import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../../Api/Api'

const FetchOld = () => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const res = await fetchPosts()
      res.status === 200 ? setPosts(res.data) : []
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className=' text-2xl  mx-auto w-[1200px] p-5'>
      <h1 className='text-center mb-[50px]'>Data fetch using normal way</h1>
      <ul>

        {
          posts.map((post) => (
            <li className='p-2 bg-blue-200 my-2'>{post.id}. {post.title}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default FetchOld