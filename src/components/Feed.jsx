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

        const feed = posts.map(post => {
            return (
                <div key={post.id} className='post-card'>
                    <img src='https://i.ebayimg.com/images/g/~NcAAOSwTC1eQoGe/s-l640.jpg' alt='post'/>
                    <div className='post-details'>
                        <p>{post.likes}</p>
                        <p>{post.caption}</p>
                    </div>
                </div>

            )
        })
        return (
            <div>
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