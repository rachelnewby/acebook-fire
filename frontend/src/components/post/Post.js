import React, { useState } from 'react';
import './Post.css';
import DeleteButtonPost from './DeleteButtonPost';
import EditButton from './EditButtonPost';
// in posts we are calling the button  what does the request to delete the post

const Post = ({post}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const updatePost = () => {
    setIsEditing(false);
    window.localStorage.reload();
  };

  return isDeleted ? (
    <div>{console.log("post was deleted :)")}</div>
  ) : (
    <div className="post">
      <article data-cy="post" key={ post._id }>{ post.content }</article>
      <DeleteButtonPost post={post} id={post._id} setIsDeleted={setIsDeleted} /> 
      <EditButton post={post} setIsEditing={updatePost}  />
    </div>
  );
};

export default Post;
