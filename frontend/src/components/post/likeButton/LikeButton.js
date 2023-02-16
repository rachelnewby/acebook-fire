import React from "react";
import { MdThumbUpOffAlt } from 'react-icons/md';
import './LikeButton.css';
const LikeButton = ({post, setLike, liked}) => {

  const handleClick = async () => {
    setLike(true);
    
    if (!liked){
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
  }

  return( 
    <div className="like-container">
      <span className='like-count'>{post.likes.length}</span>
      <button onClick={handleClick} className={`footer-button like-button ${liked ? 'like-button--liked' : ''}`}><MdThumbUpOffAlt /></button>   
    </div>
  )
}
export default LikeButton;

