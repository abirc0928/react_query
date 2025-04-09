import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { fetchUsers } from '../../Api/Api';
import { useInView } from 'react-intersection-observer';

export const InfiniteScrolling = () => {

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        getNextPageParam: (lastPages, allPages) =>
            lastPages?.length === 10 ? allPages?.length + 1 : undefined,
    });


    console.log(data)
    //----- use manual way------

    // const handleScroll = () => {
    //     const bottom =
    //         window.innerHeight + window.scrollY >=
    //         document.documentElement.scrollHeight - 1;

    //     if (bottom && hasNextPage) {
    //         fetchNextPage();
    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll)
    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, [hasNextPage])



    //----- use npm i react-intersection-observer laibrary------
    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (status === "loading") return <div>Loading...</div>;
    if (status === "error") return <div>Error fetching data</div>;

    return (
        <div className='w-[1200px] mx-auto'>
            <div className='text-center my-4 text-2xl'>
                <h1>Infinite Scroll with React Query v5</h1>
            </div>

            {data?.pages?.map((page, index) => (
                <ul key={index}>
                    {page?.map((user) => (
                        <li
                            key={user.id}
                            style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                            <p>{user.login}</p>
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                width={50}
                                height={50}
                            />
                        </li>
                    ))}
                </ul>
            ))}

            <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "Scroll down to load more"
                        : "No more users"}
            </div>
        </div>
    );
};
