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
export const fetchPostsReactQuery = async () => {
    try {
        const res = await api.get("/posts");
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
    }
}

