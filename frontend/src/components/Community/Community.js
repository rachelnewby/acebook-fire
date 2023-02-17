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

  // Gets the friends list of the logged in user and sets it in state
  useEffect(() => {
    if (userDetails) {
      setCurrentFriends(userDetails.friendsList);
    }
  }, [userDetails]);

  // Takes all users and compares against current friends to only show users you are not already
  // friends with
  const filteredPotentialFriends = useMemo(() => {
    const removeUserFromPotentialFriends = () => {
      setPotentialFriends((prevPotentialFriends) =>
        prevPotentialFriends.filter((potentialFriend) => potentialFriend._id !== loggedInUser)
      );
    };
// Removes the logged in user from friends page so you can't add yourself
    if (potentialFriends.some((potentialFriend) => potentialFriend._id === loggedInUser)) {
      removeUserFromPotentialFriends();
    }
// Returns the filtered list of potential friends
    return potentialFriends.filter((friendObj) => !currentFriends.includes(friendObj._id));
  }, [potentialFriends, currentFriends, loggedInUser]);

  // If the user has a token populates page with potential friend component
  if (token) {
    return (
      <div className="feed">
        <h2 className="h2">Potential Friends</h2>
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
