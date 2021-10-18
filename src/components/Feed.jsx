import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../axios.js'
import { Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'
import moment from 'moment'
import { LoginContext } from './LoginContext.jsx';

function Feed(props) {

    const [posts, setPosts] = useState([])
    const {loginStatus, setLoginStatus} = useContext(LoginContext)

    async function checkLogin() {

        try {
            setLoginStatus(true)
        } catch {

        }
    }

    async function getPosts() {
        await axiosInstance.get('posts/')
        .then(res => res.data)
        .then(data => setPosts(data))
        .catch(err => console.error)
    }
    useEffect(() => getPosts(), [])

    if (posts) {
        // Reverse your map 
        const feed = posts.reverse().map(post => {
            return (
                <div key={post.id} className='post-card'>
                    <div className='post-header'>
                    <h2>{post.user}</h2>
                    <p>{moment(post.datetime_modified).format("l hh:mm a")}</p>
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