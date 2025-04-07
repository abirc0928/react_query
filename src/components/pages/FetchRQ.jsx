import React, { useState } from 'react'
import { fetchPostsReactQuery } from '../../Api/Api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {

  const [pageNumber, setPageNumber] = useState(0)

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['posts', pageNumber],
    queryFn: () => fetchPostsReactQuery(pageNumber),

    // gcTime: 5000,

    // staleTime: 10000,

    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,

    placeholderData: keepPreviousData,

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
      <div className='flex gap-5 items-center justify-end mt-4'>
        <button
          disabled={pageNumber === 0}
          onClick={() => setPageNumber(pageNumber - 5)}
          className={`bg-green-400 py-1 px-4 rounded ${pageNumber === 0 ? 'text-gray-300 ' : 'text-white'} cursor-pointer`}>
          PREV
        </button>

        <h2>{(pageNumber / 5) + 1}</h2>

        <button onClick={() => setPageNumber(pageNumber + 5)} className='bg-green-400 py-1 px-4 rounded text-white cursor-pointer'>NEXT</button>
      </div>
    </div>
  )
}

export default FetchRQ