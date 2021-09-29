import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios.js'
function DetailPost(props) {

    const [post, setPost] = useState({})
    const history = useHistory()
    async function getPost() {
        await axiosInstance.get(`/posts/${props.id}`)
        .then(res => setPost(res.data))
    }
    useEffect(() => getPost(), [])

    const deletePost = () => {
        axiosInstance.delete(`/posts/${props.id}`)
        history.push('/')
    }
    return (
        <div>
            <div className='post-detail-card'>
            <a href={`/posts/${post.post_id}/edit/`}>Edit Post</a>
            <h1>{post.title}</h1>
            <img src={post.media} alt='post'/>
            <p>{post.title}</p>
            <p>{post.caption}</p>
            </div>
            <button onClick={deletePost}>Delete</button>
        </div>
    );
}

export default DetailPost;