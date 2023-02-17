import React, { useState, useEffect } from 'react';
import './Post.css';
import DeleteButtonPost from '../deleteButton/DeleteButtonPost';
import EditButton from '../editButton/EditButtonPost';
import LikeButton from '../likeButton/LikeButton';
import { FaRegUser } from 'react-icons/fa';
import CommentForm from '../../comment/comment';
import CommentList from '../../comment/commentList';
import { animations, AnimateOnChange } from 'react-animation'

function Post({ post, user }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [comments, setComments] = useState([]);
  const [liked, setLike] = useState(false);

  const handleNewComment = (comment) => {
    setComments([...comments, comment]);
  };

  useEffect(() => {
    setLike(post.likes.includes(user));
    if (isEditing) {
      window.location.reload();
    }
  }, [isEditing]);

  return isDeleted ? (
    <> </>
  ) : (
    <div className="post-container" style={{animation: animations.bounceIn}}>
      <div className='post-header'>
        <div className='post-profile-picture'><FaRegUser /></div>
        {/* <div className='post-name'>{post.user_id.firstName} {post.user_id.surname[0]}</div> */}
        <div className='post-name'>{post.user_id} </div>
        <div className='post-date-time__container'>
          <div className='post-date'>{post.date_created.slice(0, 10)}</div>
          <div className="post-time">{post.date_created.slice(11, 16)}</div>
        </div>
      </div>

        <article data-cy="post" className='post-content' key={ post._id }>
        <AnimateOnChange>
          { updatedPost.content }
        </AnimateOnChange>
      </article>

      <div>
      <CommentForm user={post.user_id} post={post} />
       
       <div className="comments-container">
         <h2>Comments ({comments.length})</h2>
         <ul>
           {Object.values(comments).map(comment => (
             <li key={comment._id}>
               <p>{comment.comment}</p>
               <p>By {comment.user_id.firstName} {comment.user_id.surname[0]}</p>
             </li>
           ))}
         </ul>
       </div>
      </div>

      <div className='post-footer'>
        <DeleteButtonPost post={post} id={post._id} setIsDeleted={setIsDeleted} />
        <EditButton post={post} onUpdate={!isEditing} setUpdatedPost={setUpdatedPost}/>
        <LikeButton post={post} liked={liked} setLike={setLike} user={user}/>
      </div>
    </div>
  );
}

export default Post;