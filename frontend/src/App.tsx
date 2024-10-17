import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Feed, Profile, Question, Saves, Settings, Tags, Users, QuestionView, TagsView, QuestionUser } from './views';
import { SignedIn, useUser, SignedOut } from '@clerk/clerk-react'

interface ProtectedRouteProps {
  Component: React.ElementType;
}

function App() {
  const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {    
    return  (
      <div>
          <SignedIn>
            <Component />
          </SignedIn> 
          <SignedOut>
            <Navigate to="/" />
          </SignedOut>
      </div>
    )
  };
  
  return (
    <div className="App" style={{backgroundColor:'#F5F5F5'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Feed}/>
          <Route path='/profile' Component={Profile}/>
          <Route path='/question/:_id' Component={QuestionView}/>
          <Route path='/newQuestion' element={<ProtectedRoute Component={Question} />} />
          <Route path='/tags' Component={Tags}/>
          <Route path='/tags/:tagName' Component={TagsView}/>
          <Route path='/saves' element={<ProtectedRoute Component={Saves} />}/>
          <Route path='/settings' element={<ProtectedRoute Component={Settings} />}/>
          <Route path='/users' element={<ProtectedRoute Component={Users} />}/>
          <Route path='/myQuestion/:publisher' element={<ProtectedRoute Component={QuestionUser} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
