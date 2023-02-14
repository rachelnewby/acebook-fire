import React, { useState } from 'react';
import './PostForm.css'

const PostForm = ({post}) => {  
    const[newPost, setNewPost] = useState("")
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = window.localStorage.getItem("token") //every event that will be handled by LOGGED IN user has to have this bit, its about JWT
        let response = await fetch( '/posts', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // This is the token header
          },

          body: JSON.stringify({ 
            content: newPost,
            likes: 0,
            user_id: token.user_id,
            date_created: new Date()
          })

        })
    
        if(response.status !== 201) {
          console.log("post was not created");

        } else {
          console.log("post was created")
          let data = await response.json()
          window.localStorage.setItem("token", data.token);

        }
      }

    const handlePostInputChange = (event) => {
      //updates the current content inside the input html tag
        setNewPost(event.target.value)
      }

  return(
    <form className='post-form' onSubmit={handleSubmit}> 
        <input
            className='post-input'
            placeholder='Add new post' 
            id="post" type='text'
            value={newPost}
            onChange={handlePostInputChange} // we are invoking the function that keeps track of what is inside the input
        />
        <button className='post-submit' type='submit'>create post</button>
    </form>
  )
  }

export default PostForm;


