import React from 'react';
import jwt from 'jsonwebtoken';

const PotentialFriend = ({ potentialFriend, userId }) => {
  // const payload = jwt.verify(userId, 'SUPER_SECRET')
  // console.log(userId)
  // // console.log(payload)


  return (
    <div className="potential-friend">
      <article data-cy="post" key={ potentialFriend._id }> {potentialFriend.firstName} {potentialFriend.surname}</article>
      {/* <article key={userId}>{userId}</article> */}
      <button className="add-friend-button">Add friend</button>
    </div>
  )
}

export default PotentialFriend;