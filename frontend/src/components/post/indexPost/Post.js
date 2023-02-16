import React, { useState, useEffect } from 'react';
import './Post.css';
import DeleteButtonPost from '../deleteButton/DeleteButtonPost';
import EditButton from '../editButton/EditButtonPost';
import LikeButton from '../likeButton/LikeButton';
import { FaRegUser } from 'react-icons/fa';
import CommentForm from '../../comment/comment';
import CommentList from '../../comment/commentList';

function Post({ post }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the post
    fetch(`your-database-url/comments?postId=${post._id}`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [post._id]);

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
        <div className='post-profile-picture'><FaRegUser /></div>
        <div className='post-name'>{post.user_id.firstName} {post.user_id.surname[0]}</div>
        <div className='post-date-time__container'>
          <div className='post-date'>{post.date_created.slice(0, 10)}</div>
          <div className="post-time">{post.date_created.slice(11, 16)}</div>
        </div>
      </div>
      <article data-cy="post" className='post-content' key={post._id}>{updatedPost.content}</article>

      <div className='post-footer'>
        <DeleteButtonPost post={post} id={post._id} setIsDeleted={setIsDeleted} />
        <EditButton post={post} onUpdate={!isEditing} />
        <LikeButton post={post} />
        <CommentForm user={post.user_id} post={post} />
        <div className="comments-container">
          <h3>Comments:</h3>
          {comments.map(comment => (
            <div key={comment._id}>
              <p>{comment.content}</p>
              <p>By {comment.user_id.firstName} {comment.user_id.surname[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;