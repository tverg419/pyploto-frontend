import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios.js';
import { Image } from 'cloudinary-react'

function Profile(props) {

    const [posts, setPosts] = useState([])
    const [author, setAuthor] = useState({})
    const user_id = localStorage.getItem('user_id')

    async function getPosts() {
        await axiosInstance.get('posts/')
        .then(res => res.data)
        .then(data => setPosts(data))
        .catch(err => console.error)
    }
    async function getAuthor() {
        await axiosInstance.get(`users/${user_id}`)
        .then(res => res.data)
        .then(data => setAuthor(data))
        .catch(err => console.error)
    }
    useEffect(() => {
        getPosts()
        getAuthor()
    }, [])
    console.log(posts)
    if (posts && author) {
        const filteredPosts = posts.filter(post => post.author === 1)
        console.log(filteredPosts)
        const profile = filteredPosts.map(post => {
            return (
                <div className='grid-square'>
                    <div key={post.id} className='profile-post'>
                        <Image cloudName='duqrxtqf3' publicID={`https://res.cloudinary.com/duqrxtqf3/${post.media}`}/>

                    </div>
                </div>

            )
        })
        return (
            <div className='profile'>
                <div className='profile-card'>
                    <div>
                        <Image cloudName='duqrxtqf3' publicID={`https://res.cloudinary.com/duqrxtqf3/${author.profile_picture}`}/>

                    </div>
                    <div className='profile-details'>
                        <p>{author.name}</p>
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