import React from 'react';

import { useState } from 'react';

const CommentForm = ({user, post}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");

    let response = await fetch('/comments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: user._id,
        post_id: post._id,
        comment: newComment
      })
    });
    
    if (!response.ok) {
      console.log("comment was not created");
    } else {
      console.log("comment was created");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
    }
  }
  const handleCommentInputChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Add new comment'
          id='comment'
          type='text'
          value={newComment}
          onChange={handleCommentInputChange}
        />
        <button type='submit'>Add comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
