import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axiosInstance from '../axios.js'

function EditPost(props) {

    const [form, setForm] = useState({})
    const history = useHistory()

    async function getPost() {
        await axiosInstance.get(`/posts/${props.id}`)
        .then(res => res.data)
        .then(data => {
            console.log(data)
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
        console.log(form)
        axiosInstance.put(`/posts/${props.id}`, form)
        .then(res => {
            history.push('/posts/success')
            return res.data
        })
    }
    return (
        <div>
            <h1>Editing Post: {form.title}</h1>
            <form onSubmit={submitEdit}>

                <input id='title' type='text' value={form.title} onChange={updateForm}></input>
                <input id='media' type='text' value={form.media} onChange={updateForm}></input>
                <textarea id='caption' value={form.caption} onChange={updateForm}></textarea>

                <button type='submit'>Finish Editing</button>
            </form>
        </div>
    );
}

export default EditPost;