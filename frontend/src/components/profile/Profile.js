import React from 'react';
import './Profile.css';
import  { useState, useEffect } from 'react';
//import friends once it's merged 



const ProfilePage = () => {
  const [user, setUser] = useState({});
  const token = window.localStorage.getItem("token")
 
  useEffect(() => {
    fetch('/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email: 'some@email.com' })
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='profile-container'>
      <h1>Profile Page</h1>
      <div className='user-info'>
        <p>Name: {user.name}</p>
        <p>Surname: {user.surname}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
