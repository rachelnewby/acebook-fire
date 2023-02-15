import React from 'react';



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
    <button onClick={handleClick}>delete post</button>
  );
};

export default DeleteButtonPost;