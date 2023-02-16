import React, { useState, useEffect } from "react";

const CommentList = ({post}) => {
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      async function fetchComments() {
        const response = await fetch(`/comments?post_id=${post._id}`);
        const data = await response.json();
        console.log(data)
        setComments(data);
      }
      fetchComments();
    }, [post._id]);
  
    return (
      <div>
        <h2>Comments ({comments.length})</h2>
        <ul>
          {comments.map(comment => (
            <li key={comment._id}>
              <p>{comment.comment}</p>
              <p>By {comment.user_id.firstName} {comment.user_id.surname[0]}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
 export default CommentList;