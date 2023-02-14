import React from "react";
import { MdThumbUpOffAlt } from 'react-icons/md';
import './LikeButton.css';
const LikeButton = ({post}) => {

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/posts/like', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        post_id: post._id
      })
    })
  }

  return( 
    <div>
      <button onClick={handleClick} className='like-button'><MdThumbUpOffAlt /></button>   
      <p>{post.likes.length}</p>
    </div>
  )
}
export default LikeButton;

