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
    <p> </p>
  ) : (
    <div className="post">
      <article data-cy="post" key={ post._id }>{ updatedPost.content }</article>

      <DeleteButtonPost post={post} id={post._id} setIsDeleted={setIsDeleted} /> 
      <EditButton post={post} onUpdate={!isEditing}/>
      <LikeButton post={post} />
    </div>
  );
};

export default Post;