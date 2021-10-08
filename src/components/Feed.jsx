import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios.js'
import { Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

function Feed(props) {

    const [posts, setPosts] = useState([])

    async function getPosts() {
        await axiosInstance.get('posts/')
        .then(res => res.data)
        .then(data => setPosts(data))
        .catch(err => console.error)
    }
    useEffect(() => getPosts(), [])
    console.log(posts)
    if (posts) {
        // Reverse your map 
        const feed = posts.reverse().map(post => {
            return (
                <div key={post.id} className='post-card'>
                    <div className='post-header'>
                    <h2>{post.user}</h2>
                    <p>{post.datetime_modified}</p>
                    </div>
                    <Image cloudName='duqrxtqf3' publicID={`https://res.cloudinary.com/duqrxtqf3/${post.media}`}/>
                    <div className='post-card-details'>
                    <Button href={`/posts/${post.id}`} variant='secondary'>See Post Details</Button>
                        </div>
                </div>

            )
        })
        return (
            <div className='feed-container'>
                <Button className='create-button' href='/posts/create'>Create Post</Button>
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