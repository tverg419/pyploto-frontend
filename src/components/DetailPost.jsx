import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios.js'
import { Form, Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

function DetailPost(props) {

    const username = localStorage.getItem('username')
    const [post, setPost] = useState()
    const [comments, setComments] = useState()
    const [commentForm, setCommentForm] = useState({
        post_id: props.id,
        user: username,
        body: ''
    })
    const history = useHistory()

    async function getPost() {
        await axiosInstance.get(`/posts/${props.id}`)
        .then(res => setPost(res.data))
    }
    
    const deletePost = () => {
        axiosInstance.delete(`/posts/${props.id}`)
        history.push('/')
    }


    async function getComments() {
        await axiosInstance.get(`/comments/?post_id=${props.id}`)
        .then(res => setComments(res.data))
    }

    function changeComment(event) {
        setCommentForm({...commentForm, [event.target.id]: event.target.value})
    }
    function createComment(event) {
        event.preventDefault()
        axiosInstance.post(`/comments/?post_id=${props.id}`, commentForm)
        window.location.reload()
    }
    function deleteComment(id) {
        axiosInstance.delete(`/comments/${id}`)
        window.location.reload()
    }
    useEffect(() => {
        getPost()
        getComments()
    }, [])
    console.log(comments)
    if (post && comments) {

            const commentsList = comments.map(comment => {
                return (
                    <div key={comment.id} className='comment-card'>
                        <p><strong>{comment.user}</strong>: {comment.body}</p>
                        <Button variant='danger' onClick={() => deleteComment(comment.id)}>X</Button>
                    </div>
                )
            })
            return (
                
                <div className='post-detail'>
                    <div className='post-detail-card'>
                        <Button href={`/posts/${post.post_id}/edit/`}>Edit Post</Button>
                        <Image cloudName='duqrxtqf3' publicID={`https://res.cloudinary.com/duqrxtqf3/${post.media}`}/>
                        <h2>{post.title}</h2>
                        <p>{post.caption}</p>
                    </div>
                    <div className='comments'>
                        <h4>Comments:</h4>
                        {commentsList}
                        <Form onSubmit={createComment}>
                            <Form.Control id='body' type='text' placeholder='Enter Comment' value={commentForm.body} onChange={changeComment}></Form.Control>
                            <Button type='submit'>Send Comment</Button>
                        </Form>
                    </div>
                    <Button variant='danger' onClick={deletePost}>Delete Post</Button>
             </div>
            );
    } else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default DetailPost;