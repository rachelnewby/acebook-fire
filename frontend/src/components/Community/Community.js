import React, { useEffect, useState } from 'react';

import PotentialFriend from '../potentialFriends/potentialFriends';

const Community = ({ navigate }) => {
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState()
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/users", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPotentialFriends(data.users);
          setLoggedInUser(data.loggedInUser)
        })
    }
  }, [token])

  useEffect(() => {
    const removeUserFromPotentialFriends = () => {
      setPotentialFriends(prevPotentialFriends => {
        return prevPotentialFriends.filter(potentialFriend => potentialFriend._id !== loggedInUser)
      });
    }
    if (potentialFriends.some(potentialFriend => potentialFriend._id === loggedInUser)) {
      removeUserFromPotentialFriends();
    }
  }, [potentialFriends, loggedInUser])

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  if(token) {
    return(
      <div className='feed'>
        <h2 className='h2'>Potential Friends</h2>
        <button className='logoutButton' onClick={logout}>
          Logout
        </button>
        <div id='feed' role="feed">
          {potentialFriends.map(
            (potentialFriend) => (
              <PotentialFriend potentialFriend={ potentialFriend } key={ potentialFriend._id } token={token}/>
            )
          )}
        </div>
      </div>
    )
  } else {
    navigate('/login')
    return null;
  }
}

export default Community;
