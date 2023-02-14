import React from 'react';
import jwt from 'jsonwebtoken';

const PotentialFriend = ({ potentialFriend, userId }) => {
  // Potential code to decode JWT to access user inforation
  // const payload = jwt.verify(userId, 'SUPER_SECRET')
  // console.log(userId)
  // // console.log(payload)


  return (
    <div className="potential-friend">
      {/* ._id is unique identifier. First & surname passed through parent to child to be displayed via prop */}
      <article data-cy="post" key={ potentialFriend._id }> {potentialFriend.firstName} {potentialFriend.surname}</article>
      {/* <article key={userId}>{userId}</article> */}
      <button className="add-friend-button">Add friend</button>
    </div>
  )
}

export default PotentialFriend;