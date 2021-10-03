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
        <div>
            
            <h2>Create Post for {user}</h2>
            <form className='form create-post-form' onSubmit={handleCreate}>
                <input id='title' type='text' placeholder='title' onChange={handleChange} value={form.title}></input>
                <input id='media' type='file' placeholder='Image Url' onChange={handleChange} value={form.media}></input>
                <textarea id='caption'placeholder='Caption' onChange={handleChange} value={form.caption}></textarea>
                <Button type='submit' variant='secondary'>Create</Button>
            </form>
        </div>
    );
}

export default CreatePost;