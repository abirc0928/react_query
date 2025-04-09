import React, { useState } from 'react';
import { fetchPostsReactQuery, deletePost, updatePost } from '../../Api/Api';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { NavLink, useLocation } from 'react-router-dom';

const FetchRQ = () => {
  const location = useLocation();
  const queryClient = useQueryClient(); // correct way to get access to query cache

  const initialPage = location.state?.page || 0;
  const [pageNumber, setPageNumber] = useState(initialPage);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['posts', pageNumber],
    queryFn: () => fetchPostsReactQuery(pageNumber),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (_data, id) => {
      // Remove the deleted item from current page cache
      queryClient.setQueryData(['posts', pageNumber], (oldData) => {
        console.log(oldData)
        return oldData?.filter((post) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      console.log(apiData, postId)
  
      queryClient.setQueryData(['posts', pageNumber], (postData) => {
        return postData?.map((curPost) => {
          return curPost.id === postId ? {...curPost, title:apiData.data.title} 
          : curPost
        })
      });
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className='text-2xl mx-auto w-[1200px] p-5'>
      <h1 className='text-center mb-[50px]'>Data fetch using React Query</h1>
      <ul>
        {data?.map((post) => (
          <li className='p-2 bg-blue-200 my-2 flex justify-between' key={post.id}>
            <NavLink to={`/rq/${post.id}`} state={{ page: pageNumber }}>
              <p>
                {post.id}. {post.title}
              </p>
            </NavLink>
            <div className='flex gap-3'>

              <button
                className='bg-green-500 px-2 py-1 text-xs text-white rounded cursor-pointer '
                onClick={() => updateMutation.mutate(post.id)}
              >
                Update
              </button>
              <button
                className='bg-red-500 px-2 py-1 text-xs text-white rounded cursor-pointer'
                onClick={() => deleteMutation.mutate(post.id)}
              >
                Delete
              </button>

            </div>
          </li>
        ))}
      </ul>

      <div className='flex gap-5 items-center justify-end mt-4'>
        <button
          disabled={pageNumber === 0}
          onClick={() => setPageNumber(pageNumber - 5)}
          className={`bg-green-400 py-1 px-4 rounded ${pageNumber === 0 ? 'text-gray-300' : 'text-white'
            } cursor-pointer`}
        >
          PREV
        </button>

        <h2>{(pageNumber / 5) + 1}</h2>

        <button
          onClick={() => setPageNumber(pageNumber + 5)}
          className='bg-green-400 py-1 px-4 rounded text-white cursor-pointer'
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default FetchRQ;
