import React from "react";
import { MdThumbUpOffAlt } from 'react-icons/md';
import './LikeButton.css';
import { AnimateOnChange } from 'react-animation'
const LikeButton = ({post, setLike, liked, user}) => {

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    if (!liked){
      setLike(true);
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
    } else{
      setLike(false);
      const response = await fetch(`/posts/${post._id}`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          likes: post.likes.filter(id => id != user)
        })
      })
    }
  }

  return( 
    <div className="like-container">
      
        <span className='like-count'><AnimateOnChange durationOut="500">{post.likes.length}</AnimateOnChange></span>
      
      <button onClick={handleClick} className={`footer-button like-button ${liked ? 'like-button--liked' : ''}`}><MdThumbUpOffAlt /></button>   
    </div>
  )
}
export default LikeButton;

