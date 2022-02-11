import React from 'react';
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/store'

import './App.scss';
import { CardList } from './components/CardList/CardList';
import { CardInfo } from './components/CardInfo/CardInfo';

function App() {
  const data = useAppSelector(state => state.defaultData.data);
  const dispatch = useDispatch();

  useEffect(() => {    
    dispatch({type: 'USER_FETCH_REQUESTED'})
  }, [])

  return (
    <div className="App">
      {data ? <Routes>
        <Route path="/" element={<CardList/>}/>
        <Route path="/:asin" element={<CardInfo/>}/>
      </Routes> : <div>Загрузка...</div>}
      
      {/*{data ? <CardList/> : <div>Загрузка...</div>}*/}
    </div>
  );
}

export default App;
