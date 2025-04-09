

import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchIndevidualPost } from '../../Api/Api';

const FetchRQIndivedual = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Read the page from router state (fallback to 0)
  const page = location.state?.page || 0;

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchIndevidualPost(id),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div>
      <div className='text-center text-xl p-4 underline italic'>
        Post id number {id}
      </div>
      <div className='w-[50%] mx-auto p-8 bg-amber-50 '>
        <div>Id: {data.id}</div>
        <div className='text-2xl'>Title: {data?.title}</div>
        <div className='mt-4'>{data?.body}</div>
      </div>
      <div className='flex items-center justify-center'>
        <button
          onClick={() => navigate('/rq', { state: { page } })}
          className='px-6 py-3 bg-green-500 text-white mt-8 rounded-3xl'
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default FetchRQIndivedual;
