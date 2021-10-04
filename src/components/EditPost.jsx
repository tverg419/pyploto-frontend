import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axiosInstance from '../axios.js'
import {Form, Button} from 'react-bootstrap'

function EditPost(props) {

    const [form, setForm] = useState({})
    const history = useHistory()

    async function getPost() {
        await axiosInstance.get(`/posts/${props.id}`)
        .then(res => res.data)
        .then(data => {
            setForm({
                ['author']: data.author, 
                ['title']: data.title, 
                ['media']: data.media, 
                ['caption']: data.caption
            })
        })
    }
    useEffect(() => getPost(), [])

    const updateForm = (event) => {
        setForm({...form, [event.target.id]: event.target.value})
    }
    function submitEdit(event) {
        event.preventDefault()
        axiosInstance.put(`/posts/${props.id}`, form)
        .then(res => {
            history.push('/posts/success')
        })
    }
    return (
        <div>
            <h1>Editing Post</h1>
            <Form onSubmit={submitEdit}>

                <Form.Control id='title' type='text' value={form.title} onChange={updateForm}></Form.Control>
                {/* <Form.Control id='media' type='textarea' value={form.media} onChange={updateForm}></Form.Control> */}
                <Form.Control id='caption' value={form.caption} onChange={updateForm}></Form.Control>

                <Button type='submit'>Finish Editing</Button>
            </Form>
        </div>
    );
}

export default EditPost;