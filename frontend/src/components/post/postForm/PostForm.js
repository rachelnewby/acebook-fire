import React, { useState } from 'react';
import './PostForm.css'
import { FiSend } from 'react-icons/fi';

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
    <form className='new-post__form' onSubmit={handleSubmit}> 
        <textarea
          type='textarea'
          name='textarea'
          className='new-post__input'
          placeholder='Add new post' 
          id="post" 
          value={newPost}
          onChange={handlePostInputChange} // we are invoking the function that keeps track of what is inside the input
        />
        <button
          className='new-post__button'
          type='submit'
        >
          <FiSend className='send-post__icon'/>
        </button>
    </form>
  )
  }

export default PostForm;


