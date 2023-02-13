import React from 'react';
import './Profile.css';
import  { useState, useEffect } from 'react';





//import friends once it's merged 



const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [post, setPost] = useState({})
  const token = window.localStorage.getItem("token")
 
  useEffect(() => {
    if (token) {
    fetch('/users/profile', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(user => {
      console.log(user)
      //window.localStorage.setItem("token", data.token)
      setUser(user)
     // console.log(user)
    })
   }
    
  }, []);
  
  if (token) {
    fetch('/posts', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(post => {
      console.log(post)
      window.localStorage.setItem("token", post.token)
      setPost(post.posts)
    })
  }

  

  return (
    <div className='profile-container'>
      <h1>Profile Page</h1>
      <div className='user-info'>
        <p>Email: {user.email}</p>
        <p>Name: {user.firstName}</p>
        <p>Surname: {user.surname}</p>
        <p>Bio: {user.bio}</p>
        </div>

        
      <div className='friend-list'></div>
      <div className='own-posts'>
      <h1>Posts:</h1>
      
        
      </div>
    </div>
  );
};

export default ProfilePage;
