import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchIndevidualPost } from '../../Api/Api';
import { NavLink } from 'react-router-dom';

const FetchRQIndivedual = () => {
    const { id } = useParams()
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchIndevidualPost(id),
    });


    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>{error}</h1>

    return (
        <div>
            <div className='text-center text-xl p-4 underline italic'>
                Post id number {id}
            </div>
            <div className='w-[50%] mx-auto p-8 bg-amber-50 '>
                <div>
                    Id: {data.id}
                </div>
                <div className='text-2xl'>
                    Title:  {data?.title}
                </div>
                <div className='mt-4'>
                    {data?.body}
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <NavLink to={'/rq'} >
                    <button className='px-6 py-3 bg-green-500 text-white mt-8 rounded-3xl'>Go back</button>
                </NavLink>
            </div>
        </div>


    )
}

export default FetchRQIndivedual