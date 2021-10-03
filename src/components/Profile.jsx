import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios.js';
import { Button } from 'react-bootstrap'
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

    if (posts && author) {

        const filteredPosts = posts.filter(post => post.author == user_id)
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
                    <div className='profile-picture'>
                        <Image cloudName='duqrxtqf3' publicID={`https://res.cloudinary.com/duqrxtqf3/${author.profile_picture}`}/>
                    </div>
                    <div className='profile-details'>
                        <p>{author.first_name} {author.last_name}</p>
                        <p>{author.username}</p>
                        <Button href='/'>Edit Profile Picture</Button>
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