import React, { useState } from 'react';
import axiosInstance from '../axios.js'

function CreatePost(props) {
    const user = localStorage.getItem('username')
    const user_id = localStorage.getItem('user_id')

    const initialState = {
        author: user_id,
        media: "",
        title: "",
        caption: "",

    }
    const [form, setForm] = useState(initialState)


    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    async function handleCreate() {
        await axiosInstance.post('posts/', {
            author: form.author,
            media: form.media,
            title: form.title,
            caption: form.caption
        })
        .then(res => console.log(res))
        .then(data => console.log(data))
    }
    return (
        <div>
            
            <h2>Create Post for {user}</h2>
            <form className='form create-post-form' onSubmit={handleCreate}>
                <input type='text' placeholder='title' onChange={handleChange}></input>
                <input type='text' placeholder='Image Url' onChange={handleChange}></input>
                <textarea placeholder='Caption' onChange={handleChange}></textarea>
                <button type='submit'>Create</button>
            </form>
        </div>
    );
}

export default CreatePost;