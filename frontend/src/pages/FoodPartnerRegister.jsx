import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessname.value;
    const contactName = e.target.contactname.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios.post(
      `${API}/api/auth/food-partner/register`,
      {
        name: businessName,
        contactName,
        phone,
        email,
        password,
        address,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);

    const partnerId = response.data.foodPartner._id;
    navigate('/create-food');
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div>
            <h1 className="auth-title">Partner sign up</h1>
            <p className="auth-sub">Grow your business with our platform.</p>
            <div className="auth-switch">
              Switch: <a href="/user/register">User</a> ·{" "}
              <a href="/food-partner/register">Food partner</a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Business name</label>
            <input
              id="businessname"
              name="businessname"
              placeholder="Tasty Bites"
            />
          </div>

          <div className="two-col">
            <div className="form-field">
              <label>Contact name</label>
              <input
                id="contactname"
                name="contactname"
                placeholder="Jane Doe"
              />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input id="phone" name="phone" placeholder="+1 555 123 4567" />
            </div>
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create password"
            />
          </div>

          <div className="form-field">
            <label>Address</label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
            />
            <div className="helper-text">
              Full address helps customers find you faster.
            </div>
          </div>

          <div className="auth-actions">
            <button className="btn btn-primary">Create Partner Account</button>
            <button type="button" className="btn btn-ghost">
              Learn more
            </button>
          </div>

          <p className="small-note">
            Already a partner?{" "}
            <a className="switch-link" href="/food-partner/login">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PartnerRegister;
