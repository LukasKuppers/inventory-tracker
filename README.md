# inventory-tracker
Shopify Backend Developer Intern Challenge - Summer 2022


## Setup
Node.js and npm must be installed. see [this guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for instructions on how to install Node.

1. clone repository to local machine.
2. from a terminal window, run the command `npm install` from both the `/api` and `/frontend` directories to install the necessary dependencies.
3. To start the app, first run `npm run start` inside the `/api` directory, to start the inventory API.
4. In a separate terminal window, run `npm start` inside the `/frontend` directory, to start the frontend UI. A browser window should automatically be opened. However, if it is not the app can be accessed at `http://localhost:3000/`.

## App Info

- The inventory tracking API was created with express.js, using sqlite as a database. Unit testing was conducted via Jest.
- The API supports the following operations:
- - `GET /api/item` gets a list of all items
- - `POST /api/item` creates a new item - accepts the item name as a JSON body
- - `PATCH /api/item/{id}` updates the item defined by id - accpets name, delete comment, or deletion status as a JSON body
- - `DELETE /api/item/{id}` premanently removes the item defined by id
- The frontend is a simple react app
