import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Feed, Profile, Question, Saves, Settings, Tags, Users } from './views';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Feed}/>
          <Route path='/profile' Component={Profile}/>
          <Route path='/newQuestion' Component={Question}/>
          <Route path='/tags' Component={Tags}/>
          <Route path='/saves' Component={Saves}/>
          <Route path='/settings' Component={Settings}/>
          <Route path='/users' Component={Users}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
