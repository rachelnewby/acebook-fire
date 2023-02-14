import React, { useEffect, useState } from 'react';

import Post from '../post/Post'
import './Feed.css';
import PostForm from '../post/PostForm';
import PotentialFriend from '../potentialFriends/potentialFriends';

const Feed = ({ navigate }) => {
  // posts renamed to feed as it will now house posts and feed depending on user input
  const [feed, setFeed] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [form, setForm] = useState(false);
  // Sets the default fetch path to load posts on log in. Changes to 'users' based on button click
  const [resource, setResource] = useState('posts')

  useEffect(() => {
    if(token) {
      // fetch path interpolated from resource ln 14
      fetch(`/${resource}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          // if resource path is posts load data from posts table
          if (resource === 'posts') {
            setFeed(data.posts)
          // if resource path is users load data from users table
          } else if (resource === 'users')
            setFeed(data.users);
        })
    }
    // Listens out for any change in resource and refreshes page when change is detected
  }, [resource])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
  if(token) {
    // loads posts initially as resource is equal to 'posts' by default
    if(resource === 'posts') {
      return(
        <div className='feed'>
          {/* Button that changes resource from posts to users if the user wants to look for potential friends */}
            <button className="display-potential-friends" onClick={() => setResource('users') }>Add Friend</button>
            <h2 className='h2'>Posts</h2>
            {/* Button to add a post shows form to add post */}
              <button className='add-post-Button' onClick={() => setForm(!form) }>Add Post</button>
                        {form && <PostForm />}
              <button className='logoutButton' onClick={logout}>
                Logout
              </button>
              {/* Loads posts onto feed one post component at a time */}
            <div id='feed' role="feed">
                {feed.map(
                  (post) => ( <Post setFeed={ setFeed } post={ post } key={ post._id } /> )
                )}
            </div>
          </div>
        )
        // if the user has clicked the button "display-potential-friends" the resource state is now == 'users' not 'posts'
      } else if(resource === 'users') {
        return(
          <div className='feed'>
            <h2 className='h2'>Potential Friends</h2>
              <button className='logoutButton' onClick={logout}>
                Logout
              </button>
              {/* iterate over data returned from users table and loads each in PotentialFriend component */}
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