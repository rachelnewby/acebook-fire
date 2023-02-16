import React from 'react';
import jwt from 'jsonwebtoken';
import './potentialFriends.css';

const PotentialFriend = ({ potentialFriend, token }) => {

  const addFriend = async (pfid, token) => {
    console.log(pfid, token)

    let response = await fetch ('/users' ,{
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // This is the token header
      },
      body: JSON.stringify({ pfid: pfid, token: token})
    })

    if(response.status !== 201) {
      console.log("friend not updated sorry :(")
    } else {
      console.log("Friend added")
      let data = await response.json()
      window.localStorage.setItem("token", data.token);
    }
  }

  return (
    <div className="potential-friend">
      {/* ._id is unique identifier. First & surname passed through parent to child to be displayed via prop */}
      <article className="friend-details" data-cy="post" key={ potentialFriend._id }> {potentialFriend.firstName} {potentialFriend.surname}</article>
      {/* <article key={userId}>{userId}</article> */}
      <button className="add-friend-button" onClick={() => addFriend(potentialFriend._id, token)}>Add friend</button>
    </div>
  )
}

export default PotentialFriend;