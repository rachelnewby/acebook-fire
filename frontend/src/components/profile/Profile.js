import React from 'react';
import './Profile.css';
import  { useState, useEffect } from 'react';
import Post from '../post/indexPost/Post';
import BioForm from '../bio/bio';





//import friends once it's merged 



const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("")
  
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
     
      
      setUser(user)
      console.log("user",user)
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
  
// const handleBioChange = (newBio) => {
//   setBio(newBio);
// }
const updateBio = (newBio) => {
  setUser((prevUser) => ({ ...prevUser, bio: newBio }));
};

  

  return (
    <div className='profile-container'>
      <h1>Profile Page</h1>
      <div className='user-info'>
        <p>Welcome to your profile, {user.firstName}</p>
        <p>Email: {user.email}</p>
        <p>Bio: <BioForm onUpdate={updateBio} /></p>
         <p>Bio: {user.bio}</p>
        {/* <div>
           <textarea value={bio} onChange={handleBioChange} />
           <button onClick={updateBio}>Update Bio</button>
          
        </div> */}
        </div>
        <div className='friend-list'>
          <h1>Friends </h1>
          <p> no friends lol </p>
          <p>{/*user.friendsList*/}</p> 
        </div>
        
      <div className='own-posts'>
      <h1>Posts</h1>
      
      <p>{posts.slice(0).reverse().map(
              (post) => ( <Post post={ post } key={ post._id } /> )
            )}</p>
        
      </div>
    </div>
  );
};


export default ProfilePage;
