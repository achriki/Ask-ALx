import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Feed, Profile, Question, Saves, Settings, Tags, Users, Error } from './views';
import { useUser } from '@clerk/clerk-react'

interface ProtectedRouteProps {
  Component: React.ElementType;
}

function App() {
  const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
    const { isSignedIn } = useUser();
  
    return isSignedIn ? <Component /> : <Navigate to="/" />;
  };
  
  return (
    <div className="App" style={{backgroundColor:'#e4e2dd'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Feed}/>
          <Route path='/profile' Component={Profile}/>
          <Route path='/newQuestion' element={<ProtectedRoute Component={Question} />} />
          <Route path='/tags' element={<ProtectedRoute Component={Tags} />}/>
          <Route path='/saves' element={<ProtectedRoute Component={Saves} />}/>
          <Route path='/settings' element={<ProtectedRoute Component={Settings} />}/>
          <Route path='/users' element={<ProtectedRoute Component={Users} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
