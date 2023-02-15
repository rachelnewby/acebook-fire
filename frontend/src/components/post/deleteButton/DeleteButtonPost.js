import React from 'react';
import { BiTrash } from 'react-icons/bi';
import './DeleteButtonPost.css'


const DeleteButtonPost = ({post, id, setIsDeleted}) => {
  const token = localStorage.getItem('token');


  const handleClick = async () => {
    try {
      await fetch(`/posts/${post._id}`, {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setIsDeleted(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <button className="footer-button delete-button" onClick={handleClick}><BiTrash /></button>
  );
};

export default DeleteButtonPost;