import React, { useState } from 'react';
import '../App.css';
const axios = require('axios');
const util = require('../util.js');
const constants = require('../constants.js');

const CreateItem = () => {

    const [itemName, setItemName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (itemName.length === 0) {
            return;
        }
        requestCreateItem(itemName)
            .then(() => {
                window.location.href = constants.pageUrl + '/';
            })
    }

    return (
        <div className='create-item'>
            <h1>CREATE NEW ITEM</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter the item name :
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

const requestCreateItem = async (name) => {
    axios.post(util.constructUrl('/api/item'), {
        name: name
    })
    .catch((err) => {
        console.error(err)
    });
}

export default CreateItem;
