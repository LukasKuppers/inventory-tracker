import React, { useState, useEffect } from 'react';
import '../App.css';
const axios = require('axios');
const util = require('../util.js');
const constants = require('../constants.js');

const ItemList = ({viewDeleted}) => {

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        getItems();
    }, [itemList]);

    const getItems = () => {
        requestGetItems()
            .then((payload) => {
                setItemList(payload);
            });
    }

    const restoreItem = (id) => {
        requestRestoreItem(id)
            .then(() => {
                getItems();
            })
    }

    const renderTableRows = (items) => {
        if (viewDeleted) {
            return items.map(item => {
                return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.timestamp}</td>
                    <td>{item.delete_comment}</td>
                    <td><button onClick={() => restoreItem(item.id)}>restore</button></td>
                </tr>);
            });
        } else  {
            return items.map(item => {
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.timestamp}</td>
                        <td><button onClick={() => openEditPage(item.id)}>edit</button></td>
                        <td><button onClick={() => openDeletePage(item.id)}>delete</button></td>
                    </tr>);
            });
        }
    }

    const renderItems = (items) => {
        return (
            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Creation Time</th>
                    { viewDeleted ? <th>Comment</th> : <th></th>}
                </tr>
                { renderTableRows(items) }
            </table>
        )
    }

    return (
        <div className="item-list-container">
            <h1>{ viewDeleted ? 'DELETED' : '' } ITEMS</h1>
            { viewDeleted ? 
                <a href={constants.pageUrl + '/'} className='button'>view existing items</a> :
                <a href={constants.pageUrl + '/deleted'} className='button'>view deleted items</a> }
            <a href={constants.pageUrl + '/create'} className='button'>create new item</a>
            { renderItems(viewDeleted ? getDeletedItems(itemList) : filterDeletedItems(itemList)) }
        </div>
    );
}

const filterDeletedItems = (itemList) => {
    return itemList.filter(item => {
        return item.is_deleted === 0;
    });
}

const getDeletedItems = (itemList) => {
    return itemList.filter(item => {
        return item.is_deleted === 1;
    });
}

const openEditPage = (itemId) => {
    window.location.href = constants.pageUrl + '/edit/' + itemId;
}

const openDeletePage = (itemId) => {
    window.location.href = constants.pageUrl + '/delete/' + itemId;
}

const requestGetItems = async () => {
    return axios.get(util.constructUrl('/api/item'))
    .then((res) => {
        return res.data.data;
    })
    .catch((err) => {
        console.error(err);
    });
}

const requestRestoreItem = async (itemId) => {
    axios.patch(util.constructUrl('/api/item/' + itemId), {
        delete_comment: null, 
        is_deleted: 0
    })
    .catch((err) => {
        console.error(err);
    });
}

export default ItemList;
