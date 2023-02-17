import React, { useEffect, useState, useMemo } from 'react';
import PotentialFriend from '../potentialFriends/potentialFriends';

const Community = ({ navigate }) => {
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [currentFriends, setCurrentFriends] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [token, setToken] = useState(() => window.localStorage.getItem('token'));

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      window.localStorage.setItem('token', data.token);
      setToken(data.token);
      setPotentialFriends(data.users);
      setLoggedInUser(data.loggedInUser);
      setUserDetails(data.users.find(({ _id }) => _id === data.loggedInUser));
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    if (userDetails) {
      setCurrentFriends(userDetails.friendsList);
    }
  }, [userDetails]);

  const filteredPotentialFriends = useMemo(() => {
    const removeUserFromPotentialFriends = () => {
      setPotentialFriends((prevPotentialFriends) =>
        prevPotentialFriends.filter((potentialFriend) => potentialFriend._id !== loggedInUser)
      );
    };

    if (potentialFriends.some((potentialFriend) => potentialFriend._id === loggedInUser)) {
      removeUserFromPotentialFriends();
    }

    return potentialFriends.filter((friendObj) => !currentFriends.includes(friendObj._id));
  }, [potentialFriends, currentFriends, loggedInUser]);

  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  if (token) {
    return (
      <div className="feed">
        <h2 className="h2">Potential Friends</h2>
        <button className="logoutButton" onClick={logout}>
          Logout
        </button>
        <div id="feed" role="feed">
          {filteredPotentialFriends.map((potentialFriend) => (
            <PotentialFriend potentialFriend={potentialFriend} key={potentialFriend._id} token={token} />
          ))}
        </div>
      </div>
    );
  } else {
    navigate('/login');
    return null;
  }
};

export default Community;
