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
        const filteredPosts = posts.filter(post => post.author === 1)
        console.log(filteredPosts)
        const profile = filteredPosts.map(post => {
            return (
                <div className='grid-square'>
                    <div key={post.id} className='post-card'>
                        <div>Grid</div>
                    </div>
                </div>

            )
        })
        return (
            <div className='grid-container'>
                {profile}
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