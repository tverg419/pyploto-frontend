import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios.js'
import { Button } from 'react-bootstrap'
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
                    <Button href={`/posts/${post.post_id}`} variant='secondary'>See Post Details</Button>
                </div>

            )
        })
        return (
            <div>
                <Button href='/posts/create'>Create Post</Button>
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