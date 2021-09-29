import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios.js'

function Feed(props) {

    const [posts, setPosts] = useState([])

    async function getPosts() {
        await axiosInstance.get('posts/')
        .then(res => res.data)
        .then(data => setPosts(data))
        .catch(err => console.error)
    }
    useEffect(() => getPosts(), [])

    if (posts) {
        // Reverse your map 
        const feed = posts.map(post => {
            return (
                <div key={post.id} className='post-card'>
                    <img src={post.media} alt='post'/>
                    <div className='post-details'>
                    </div>
                    <a href={`/posts/${post.post_id}`}>See Post Details</a>
                </div>

            )
        })
        return (
            <div>
                <a href='/posts/create'>Create Post</a>
                {feed}
            </div>
        )

    } else {

        return (
            <div>
                <p>Loading...</p>
            </div>
        )

    }

}

export default Feed;