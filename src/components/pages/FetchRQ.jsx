import React from 'react'
import { fetchPostsReactQuery } from '../../Api/Api'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {



  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPostsReactQuery,

    // gcTime: 5000,

    // staleTime: 10000,

    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,

  });


  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>{error}</h1>

  return (
    <div className=' text-2xl  mx-auto w-[1200px] p-5'>
      <h1 className='text-center mb-[50px]'>Data fetch using react query</h1>
      <ul>

        {
          data?.map((post) => (
            <NavLink to={`/rq/${post.id}`}>
              <li className='p-2 bg-blue-200 my-2'>{post.id}. {post.title}</li>
            </NavLink>
          ))
        }
      </ul>
    </div>
  )
}

export default FetchRQ