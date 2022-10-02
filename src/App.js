import React, { useState } from 'react';
import './index.scss';

import Collection from './Collection';

const cats = [ // Массив категорий
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`https://631263c7f5cba498da921a45.mockapi.io/Photos?${categoryId ? `category=${categoryId}` : ''}`)
    .then((res) => {
      res.json();
    })
    .then((json) => {
      setCollections(json);
    })
    .catch((err) => {
      console.warn(err);
      alert("Ошибка при загрузке данных");
    })
    .finally(() => {
      setIsLoading(true);
    })
    
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj,i) => (
              <li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name} >{obj.name}</li>
            ))
          }
        </ul>
        <input className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        <Collection
          name="Путешествие по миру"
          images={[
            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          ]}
        />
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
