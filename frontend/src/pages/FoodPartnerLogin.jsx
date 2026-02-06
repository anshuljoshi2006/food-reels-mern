import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { API } from '../../api';

const PartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(`${API}/api/auth/food-partner/login`,{
      email,
      password
    },{
      withCredentials : true
    })
    console.log(response.data)

    const partnerId = response.data.foodPartner._id;
navigate('/create-food');

  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div>
            <h1 className="auth-title">Partner sign in</h1>
            <p className="auth-sub">Access your Food Partner dashboard</p>
          </div>
        </div>

        <form onSubmit = {handleSubmit}>
          <div className="form-field">
            <label>Email</label>
            <input id="email" name = "email" type="email" placeholder="owner@yourbiz.com" />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input id="password" name = "password" type="password" placeholder="Your password" />
          </div>

          <div className="auth-actions">
            <button className="btn btn-primary">Sign in</button>
            <button type="button" className="btn btn-ghost">Need help?</button>
          </div>

          <p className="small-note">Don't have an account? <a className="switch-link" href="/food-partner/register">Sign up</a></p>
        </form>
      </div>
    </div>
  )
}

export default PartnerLogin
