import React, { useState } from 'react';
import '../App.css';
const axios = require('axios');
const util = require('../util.js');
const constants = require('../constants.js');

const DeleteItem = ({itemId}) => {

    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        requestDeleteItem(comment, itemId)
            .then(() => {
                window.location.href = constants.pageUrl + '/';
            })
    }

    return (
        <div className='delete-item'>
            <h1>DELETE ITEM</h1>
            <form onSubmit={handleSubmit}>
                <label>Add an optional delete comment :
                    <input 
                        type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}/>
                </label>
                <input type='submit' />
            </form>
        </div>
    );
}

const requestDeleteItem = async (comment, id) => {
    axios.patch(util.constructUrl('/api/item/' + id), {
        is_deleted: 1, 
        delete_comment: comment
    })
    .catch((err) => {
        console.error(err);
    });
}

export default DeleteItem;