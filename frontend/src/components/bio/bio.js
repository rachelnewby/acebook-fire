import React, { useState } from "react";


const BioForm = ({ bio, onUpdate}) => {
  const [newBio, setNewBio] = useState(bio);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    let response = await fetch('/users/update-bio', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bio: newBio })
    });
    if (response.status === 200) {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      setNewBio(data.user.bio);
      onUpdate(data.user.bio);
    } else {
      console.log("Error updating bio");
    }
    
  };


  const handleBioUpdate = (event) => {
    setNewBio(event.target.value);
  };

  return (
    <form className='bio-form' onSubmit={handleSubmit}> 
      <textarea
        type='textarea'
        name='textarea'
        className='bio-input'
        placeholder='Add bio' 
        id="bio" 
        value={bio}
        onChange={handleBioUpdate}
      />
      <button
        className='bio-button'
        type='submit'
      >
        Update Bio
      </button>
    </form>
  );
};

export default BioForm;


