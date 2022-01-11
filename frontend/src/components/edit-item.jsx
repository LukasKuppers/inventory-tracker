import React, { useState } from 'react';
import '../App.css';
const axios = require('axios');
const util = require('../util.js');
const constants = require('../constants.js');

const EditItem = ({itemId}) => {

    const [itemName, setItemName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (itemName.length === 0) {
            return;
        }
        requestEditItem(itemName, itemId)
            .then(() => {
                window.location.href = constants.pageUrl + '/';
            })
    }

    return (
        <div className='edit-item'>
            <h1>EDIT ITEM</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter the new item name :
                    <input 
                        type='text'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}/>
                </label>
                <input type='submit' />
            </form>
        </div>
    );
}

const requestEditItem = async (name, id) => {
    axios.patch(util.constructUrl('/api/item/' + id), {
        name: name
    })
    .catch((err) => {
        console.error(err)
    });
}

export default EditItem;
