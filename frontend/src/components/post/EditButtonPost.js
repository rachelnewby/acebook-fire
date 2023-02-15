import React from "react";
import { useState } from "react";

const EditButton = ({post, onUpdate}) => {

  const [newMessage, setNewMessage] = useState(post.message)
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');
  const handleClick = async () => {
    try {
      await fetch(`/posts/${post._id}`, {
        method: 'put',
        headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          content: newMessage,
          likes: post.likes,
          user_id: token.user_id,
          date_created: new Date()
        })
      });
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button onClick={handleClick}>Update post</button>
        </div>
      ) : (
        <> </>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit"}
      </button>
    </div>
  );

}


export default EditButton;