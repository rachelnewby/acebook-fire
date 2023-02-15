import React from 'react';
import './Profile.css';
import  { useState, useEffect } from 'react';
import Post from '../post/Post';





//import friends once it's merged 



const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([])
  
  const [token, setToken] = useState(window.localStorage.getItem("token"));
 
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
     
      //window.localStorage.setItem("token", data.token)
      setUser(user)
     // console.log(user)
    })
   }
   if(token) {
    fetch("/posts", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setPosts(data.posts);
        console.log(posts);
      })
  }
}, []);
  
  

  

  return (
    <div className='profile-container'>
      <h1>Profile Page</h1>
      <div className='user-info'>
        <p>Email: {user.email}</p>
        <p>Name: {user.firstName}</p>
        <p>Surname: {user.surname}</p>
        <p>Bio: {user.bio}</p>
        </div>
        <div className='friend-list'>
          <h1>Friends </h1>
          <p>{/*user.friendsList*/}</p> 
        </div>
        
      <div className='own-posts'>
      <h1>Posts</h1>
      
      <p>{posts.map(
              (post) => ( <Post post={ post } key={ post._id } /> )
            )}</p>
        
      </div>
    </div>
  );
};

export default ProfilePage;
