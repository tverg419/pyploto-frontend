import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap'
import axiosInstance from '../axios.js'
import { Image } from 'cloudinary-react'

function Search(props) {

    const[posts, setPosts] = useState([])
    const[searchTerm, setSearchTerm] = useState('')

    async function getPosts() {
        await axiosInstance.get('posts/')
        .then(res => res.data)
        .then(data => setPosts(data))
        .catch(err => console.error)
    }

    useEffect(() => getPosts(), [])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    if (posts) {

        const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm))

        const results = filteredPosts.map(post => {
            return (
                <div className='grid-square'>
                    <div key={post.id} className='profile-post'>
                        <Image cloudName='duqrxtqf3' publicID={`https://res.cloudinary.com/duqrxtqf3/${post.media}`}/>
                    </div>
                </div>

            )
        })
        return (
            <div>
                <div>
                    <h1>Search Posts</h1>
                    < Form onSubmit={handleSearch}>
                        <Form.Control id='search' type='text' placeholder='Search for posts..' value={searchTerm} onChange={handleSearch}></Form.Control>
                        <Button type='submit'>Search</Button>
                    </Form>
                </div>
                <div className='grid-container'>
                    {results}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }
}

export default Search;