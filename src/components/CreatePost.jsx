import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axiosInstance from '../axios.js'
import { Button } from 'react-bootstrap'

function CreatePost(props) {
    const user = localStorage.getItem('username')
    const user_id = localStorage.getItem('user_id')
    
    const initialState = {
        author: user_id,
        media: "",
        title: "",
        caption: "",
        
    }

    const history = useHistory()
    const [form, setForm] = useState(initialState)

    const handleChange = (event) => {
        setForm({...form, [event.target.id]: event.target.value})
    }

    async function handleCreate(event) {
        event.preventDefault();
        await axiosInstance.post('posts/', {
            author: form.author,
            media: form.media,
            title: form.title,
            caption: form.caption
        })
        .then(res => {
            history.push('/posts/success')
            return res.data
        })
    }
    return (
        <div className='form d-grid gap-2'>
            
            <h2>Create Post for {user}</h2>
            <form className='create-post-form' onSubmit={handleCreate}>
                <input id='title' type='text' placeholder='Title' onChange={handleChange} value={form.title}></input>
                <input id='media' type='file' onChange={handleChange} value={form.media}></input>
                <textarea id='caption'placeholder='Caption' onChange={handleChange} value={form.caption}></textarea>
            </form>
                <Button type='submit' variant='secondary'>Create</Button>
        </div>
    );
}

export default CreatePost;