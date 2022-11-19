import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
    // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // navigation
    const navigate = useNavigate();
    const navigateToLogin = () => {
      navigate('/login');
    }
   
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
   
    // Handling the name change
    const handleName = (e) => {
      setName(e.target.value);
      setSubmitted(false);
    };
   
    // Handling the email change
    const handleEmail = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
    };
   
    // Handling the password change
    const handlePassword = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
    };
   
    // Handling the form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if (name === '' || email === '' || password === '') {
        setError(true);
      } else {
        setSubmitted(true);
        setError(false);
      }
      
    };
   
    // Showing success message
    const successMessage = () => {
      return (
        <div
          className="success"
          style={{
            display: submitted ? '' : 'none',
          }}>
          <p>Your account under the name of {name} is successfully registered!</p>
        </div>
      );
    };
   
    // Showing error message if error is true
    const errorMessage = () => {
      return (
        <div
          className="error"
          style={{
            display: error ? '' : 'none',
          }}>
          <p>Please enter all the fields</p>
        </div>
      );
    };
   
    return (
        <div className="col-10 col-md-8 col-lg-7">
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              {errorMessage}
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={handleName}
              />
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
              <input
                type = "password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              
              />
                


              <button type="submit" className="btn btn-primary ml-auto">
                Sign Up
              </button>
            </div>
          </form>
          <button className = "btn btn-info" onClick={navigateToLogin}>Already have an account? Login here.</button>
        </div>
      );
  }