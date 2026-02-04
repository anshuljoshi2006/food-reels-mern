import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value

    const response = await axios.post("http://localhost:3000/api/auth/user/register",{
        fullName:firstName + " " + lastName,
        email,
        password
    },{
        withCredentials: true
    })
    console.log(response.data);

    navigate("/reels");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div>
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-sub">Join to explore and enjoy delicious meals.</p>
            <div className="auth-switch">Switch: <a href="/user/register">User</a> · <a href="/food-partner/register">Food partner</a></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} >
          <div className="two-col">
            <div className="form-field">
              <label>First name</label>
              <input id="firstName" name="firstName" placeholder="Jane" />
            </div>
            <div className="form-field">
              <label>Last name</label>
              <input id="lastName" name="lastName" placeholder="Doe" />
            </div>
          </div>

          <div className="form-field">
            <label>Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input id="password" name="password" type="password" placeholder="Create password" />
          </div>

          <div className="auth-actions">
            <button className="btn btn-primary">Sign Up</button>
            <button type="button" className="btn btn-ghost">Help</button>
          </div>

          <p className="small-note">Already have an account? <a className="switch-link" href="/user/login">Sign in</a></p>
        </form>
      </div>
    </div>
  )
}

export default UserRegister
