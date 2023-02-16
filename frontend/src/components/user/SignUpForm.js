import React, { useState } from 'react';
import './SignUpForm.css'

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, 
        password: password,
        firstName: firstName,
        surname: lastName
       })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }


    return (
      <div className="register-page__container">
        <div className="form__container">
          <h1>Register</h1>
          <form className="form__inputs" onSubmit={handleSubmit}>
            <div className="form__input">
              <input autoFocus name="firstname" id="firstname" type='text' value={ firstName } onChange={handleFirstNameChange} />
              <label htmlFor="firstname">Firstname</label>
            </div>
            <div className="form__input">
              <input name="lastname" id="lastname" type='text' value={ lastName } onChange={handleLastNameChange} />
              <label htmlFor="lastname">Lastname</label>
            </div>
            <div className="form__input form__email">
              <input name="email" id="email" type='email' value={ email } onChange={handleEmailChange} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form__input form__password">
              <input name="password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
              <label htmlFor="password">Password</label>
            </div>
            <button className="form__button" type="submit" value="Submit">Register</button>
          </form>
        </div>
      </div>

    );
}

export default SignUpForm;
