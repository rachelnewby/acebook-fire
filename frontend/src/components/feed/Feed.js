import React, { useEffect, useState } from 'react';

import Post from '../post/indexPost/Post'
import './Feed.css';

import PostForm from '../post/postForm/PostForm';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState();
  
  useEffect(() => {
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
          setUserId(data.currentUser);
        })
    }
  }, [])
  
  if(token) {
    return(
      <>
        <h2 className='post-title'>Posts</h2>

        <div className='add-post-container'>
          {/* <button className='custom-btn btn' onClick={() => setForm(!form) }>Add Post</button> */}
          <PostForm />
        </div>


        <div id='feed' role="feed">
            {posts.map(
              (post) => ( <Post post={ post } user={ userId }key={ post._id } /> )
            )}
        </div>
      </>
    )
  } else {
    navigate('/login')
  }
}

export default Feed;