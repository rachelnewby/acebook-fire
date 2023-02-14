import React, { useState, useEffect } from 'react';
import './Post.css';
import DeleteButtonPost from './DeleteButtonPost';
import EditButton from './EditButtonPost';
import LikeButton from './LikeButton';

const Post = ({post}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => {
    // Refresh the page after count reaches a certain value

    if (isEditing) {
      window.location.reload();
    }
  }, [isEditing]);


  return isDeleted ? (
    <> </>
  ) : (
    <div className="post-container">
      <div className='post-header'>
        <div className='post-name'>Name Here</div>
        <div className='post-date'>12/04/2022</div>
      </div>
      <article data-cy="post" className='post-content' key={ post._id }>{ updatedPost.content }</article>

      <div className='post-footer'>
        <DeleteButtonPost post={post} id={post._id} setIsDeleted={setIsDeleted} /> 
        <EditButton post={post} onUpdate={!isEditing}/>
        <LikeButton post={post} />
      </div>
    </div>
  );
};

export default Post;