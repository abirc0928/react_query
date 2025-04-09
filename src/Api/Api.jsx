import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

// normal way
export const fetchPosts = () => {
    return api.get("/posts")
}

// use react query
export const fetchPostsReactQuery = async (page) => {
    try {
        const res = await api.get(`/posts?_start=${page}&_limit=5`);
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
    }
}

// use react query
export const fetchIndevidualPost = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`);
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
    }
}

// delete post

export const deletePost = (id) => {

    return api.delete(`/posts/${id}`)
}

// update post

export const updatePost = (id) => {

    return api.patch(`/posts/${id}`, { title: "I have updated" })
}




export const fetchUsers = async ({ pageParam }) => {
    try {
        const res = await axios.get(
            `https://api.github.com/users?per_page=10&page=${pageParam}`
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};