import React, { useState } from 'react';
import './LoginForm.css';

const LogInForm = ({ navigate, assignToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      // if the user is not already signed in, render the login form
      console.log("yay")
      navigate('/login')
    } else {
      // otherwise, redirect to the posts page
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token) // not sure what the window object is?
      assignToken(data.token);
      navigate('/posts');
    }
  }

  // React controlled components, update state when input values change
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (

      <div className="login-page__container">
        <div className="form__container">
          <h1>Sign in</h1>
          <form className="form__inputs" onSubmit={handleSubmit}>
            <div className="form__input form__email">
              <input name="email" id="email" type='email' value={ email } onChange={handleEmailChange} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form__input form__password">
              <input name="password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
              <label htmlFor="password">Password</label>
            </div>
            <button className="form__button" type="submit" value="Submit">Sign in</button>
          </form>
        </div>
      </div>


      // <form onSubmit={handleSubmit}>
      //   <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
      //   <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
      //   <input role='submit-button' id='submit' type="submit" value="Submit" />
      // </form>
    );
}

export default LogInForm;
