import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const navigate = useNavigate()
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value

    const response = await axios.post("http://localhost:3000/api/auth/user/login",{
      email,
      password
    },{
      withCredentials : true
    })
    console.log(response.data);

    navigate("/reels")
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-sub">Sign in to your Foodie account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input id="password" name="password" type="password" placeholder="Your password" />
          </div>

          <div className="auth-actions">
            <button className="btn btn-primary">Sign in</button>
            <button type="button" className="btn btn-ghost">Forgot?</button>
          </div>

          <p className="small-note">New here? <a className="switch-link" href="/user/register">Create an account</a></p>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
