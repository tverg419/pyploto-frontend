import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios.js'
import { Form, Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

function DetailPost(props) {

    const [post, setPost] = useState()
    const [comments, setComments] = useState()
    const [commentForm, setCommentForm] = useState({
        post_id: props.id,
        author_id: 1,
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
        .then(res => console.log(res.data))
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
    console.log(post)
    if (post && comments) {

            const commentsList = comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <p>{comment.author_id}: {comment.body}</p>
                        <Button variant='danger' onClick={() => deleteComment(comment.id)}>Delete</Button>
                    </div>
                )
            })
            return (
                
                <div>
                    <div className='post-detail-card'>
                        <Button href={`/posts/${post.post_id}/edit/`}>Edit Post</Button>
                        <h1>{post.title}</h1>
                        <Image cloudName='duqrxtqf3' publicID={`https://res.cloudinary.com/duqrxtqf3/${post.media}`}/>
                        <p>{post.title}</p>
                        <p>{post.caption}</p>
                    </div>
                    <div className='comments'>
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