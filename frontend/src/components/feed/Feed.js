import React, { useEffect, useState } from 'react';

import Post from '../post/Post'
import './Feed.css';
import PostForm from '../post/PostForm';
import PotentialFriend from '../potentialFriends/potentialFriends';

const Feed = ({ navigate }) => {
  const [feed, setFeed] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [form, setForm] = useState(false);
  const [resource, setResource] = useState('posts')

  useEffect(() => {
    if(token) {
      fetch(`/${resource}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          if (resource === 'posts') {
            setFeed(data.posts)
          } else if (resource === 'users')
            setFeed(data.users);
        })
    }
  }, [resource])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
  if(token) {
    if(resource === 'posts') {
      return(
        <div className='feed'>
            <button onClick={() => setResource('users') }>Add Friend</button>
            <h2 className='h2'>Posts</h2>
              <button className='add-post-Button' onClick={() => setForm(!form) }>Add Post</button>
                        {form && <PostForm />}
              <button className='logoutButton' onClick={logout}>
                Logout
              </button>
            <div id='feed' role="feed">
                {feed.map(
                  (post) => ( <Post setFeed={ setFeed } post={ post } key={ post._id } /> )
                )}
            </div>
          </div>
        )
      } else if(resource === 'users') {
        return(
          <div className='feed'>
            <h2 className='h2'>Potential Friends</h2>
              <button className='logoutButton' onClick={logout}>
                Logout
              </button>
            <div id='feed' role="feed">
                {feed.map(
                  (potentialFriend) => ( <PotentialFriend potentialFriend={ potentialFriend } key={ potentialFriend._id } userId={token}/> )
                )}
            </div>
          </div>
        )
      }
    } else {
      navigate('/login')
    }
}

export default Feed;