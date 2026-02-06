import React, { useState, useEffect } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API } from "../../api";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-inner">
          <div className="profile-top">
            <div aria-hidden="true" />
            <img className="profile-avatar" src="https://images.unsplash.com/photo-1768326205103-0ad658551cea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div style={{ flex: 1 }} />
          </div>

          <div className="meta-pills">  
            <div className="business-name">{profile?.name}</div>
            <div className="business-address">{profile?.address}</div>
          </div>

          <div className="profile-stats">
            <div className="stat">
              <div className="stat-label">total meals</div>
              <div className="stat-value">{profile?.totalMeals}</div>
            </div>

            <div className="stat">
              <div className="stat-label">customer served</div>
              <div className="stat-value">{profile?.customersServed}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {videos.map((v) => (
          <div key={v._id} className="profile-grid-item">
            <video className="profile-grid-video" src={v.video} muted />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
