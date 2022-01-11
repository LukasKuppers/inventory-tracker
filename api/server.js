const express = require('express');
const cors = require('cors');
const inventoryApi = require('./inventory-api.js');

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());

// item api endpoints:

app.get('/api/item', inventoryApi.getItems);

app.post('/api/item', inventoryApi.postItem);

app.patch('/api/item/:id', inventoryApi.patchItem);

app.delete('/api/item/:id', inventoryApi.deleteItem);

// default response for any request not defined
app.use((req, res) => {
    res.status(404);
})

app.listen(port, () => console.log(`Inventory API listening on port ${port}.`));
