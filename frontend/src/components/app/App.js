import './App.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import React, { useState } from 'react';
import Feed from '../feed/Feed';
import Navbar from '../navbar/Navbar';
import Community from '../Community/Community';

import {
  useNavigate,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import ProfilePage from '../profile/Profile';

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
    return (
      <div className='app'>
        <Navbar navigate={ useNavigate() } signedIn={ token }/>
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() } assignToken={ setToken }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() } />}/>
          <Route path='/users' element={<Community navigate={ useNavigate() } />}/>
          <Route path='/profile' element={<ProfilePage navigate={ useNavigate() } />}/>
          <Route path='*' element={token ? <Navigate to="/posts" replace /> : <Navigate to="/login" replace />}/>
        </Routes>
      </div>
    );
}

export default App;
