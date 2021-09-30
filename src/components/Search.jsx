import React from 'react';
import { Form, Button } from 'react-bootstrap'

function Search(props) {
    return (
        <div>
            <h1>Search Posts</h1>
            <Form>
                <Form.Control type='text' placeholder='Search for posts..'></Form.Control>
            </Form>

        </div>
    );
}

export default Search;