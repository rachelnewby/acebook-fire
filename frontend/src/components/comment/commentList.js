import React, { useState, useEffect } from "react";
import CommentForm from "./comment";

const CommentList = ({post}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const token = window.localStorage.getItem("token");
      const response = await fetch(`/comments/${post._id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log("data",data)
        setComments(data);
       
      }
    };
  
    fetchComments();
  }, [post._id]);

  return (
    <div>
      <h2>Comments ({comments.length})</h2>
      <CommentForm post={post} setComments={setComments} />
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