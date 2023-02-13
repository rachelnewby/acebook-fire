import React from 'react';
import './Community.css';

const PotentialFriend = ({ potentialFriend }) => {

  return (
    <div className="potential-friend">
      <article data-cy="post" key={ potentialFriend._id }> `${potentialFriend.firstName} ${potentialFriend.surname}`</article>
      <button className="add-friend-button">Add friend</button>
    </div>
  )
}

export default PotentialFriend;