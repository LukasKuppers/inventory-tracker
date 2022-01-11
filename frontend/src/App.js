import './App.css';
import React, {useState, useEffect} from 'react';
import ItemList from './components/item-list'
import CreateItem from './components/create-item';
import DeleteItem from './components/delete-item';
import EditItem from './components/edit-item';
const constants = require('./constants.js');

function App() {

  const [path, setPath] = useState('/');

  useEffect(() => {
    const totalUrl = window.location.href;
    const path = totalUrl.replace(constants.pageUrl, '');
    setPath(path);
  }, []);

  const routePage = () => {
    if (path === '/' || path === '') {
      return <ItemList viewDeleted={false} />
    }
    if (path.startsWith('/deleted')) {
      return <ItemList viewDeleted={true} />
    }
    if (path.startsWith('/create')) {
      return <CreateItem />
    }
    if (path.startsWith('/edit')) {
      const id = getIdParam(path, 'edit');
      return <EditItem itemId={id} />
    }
    if (path.startsWith('/delete')) {
      const id = getIdParam(path, 'delete');
      return <DeleteItem itemId={id} />
    }
    return (
      <div>
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>INVENTORY TRACKER</h1>
      <div className="App-body">
        { routePage() }
      </div>
    </div>
  );
}

const getIdParam = (path, pageName) => {
  const idStr = path.replace(`/${pageName}/`, '');
  return parseInt(idStr);
} 

export default App;
