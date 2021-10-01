import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios.js';

function Profile(props) {

    const [posts, setPosts] = useState([])
    
    async function getPosts() {
        await axiosInstance.get('posts/')
        .then(res => res.data)
        .then(data => setPosts(data))
        .catch(err => console.error)
    }
    useEffect(() => getPosts(), [])

    if (posts) {
        const filteredPosts = posts.filter(post => post.author === 2)
        console.log(filteredPosts)
        const profile = filteredPosts.map(post => {
            return (
                <div className='grid-square'>
                    <div key={post.id} className='profile-post'>
                        <img src={post.media} alt='grid'></img>
                    </div>
                </div>

            )
        })
        return (
            <div className='profile'>
                <div className='profile-card'>
                    <div>
                        <img className='profile-picture' alt='profile-pic'></img>
                    </div>
                    <div className='profile-details'>
                        <p>Full Namesdfjhsfkjhskfhsfksahfaksfhkfh</p>
                    </div>
                </div>
                <div className='grid-container'>
                    {profile}
                </div>
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
export default Profile;