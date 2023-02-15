import React, { useState, useEffect } from 'react';
import './Post.css';
import DeleteButtonPost from '../deleteButton/DeleteButtonPost';
import EditButton from '../editButton/EditButtonPost';
import LikeButton from '../likeButton/LikeButton';
import { FaRegUser } from 'react-icons/fa';

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

  console.log(post);

  return isDeleted ? (
    <> </>
  ) : (
    <div className="post-container">
      <div className='post-header'>
        <div className='post-name'><FaRegUser />{post.userID.firstName} {post.userID.lastName[0]}</div>
        <div className='post-date-time__container'>
          <div className='post-date'>{post.dateCreated.slice(0, 9)}</div>
          <div className="post-time">{post.dateCreated.slice(11, 19)}</div>
        </div>
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