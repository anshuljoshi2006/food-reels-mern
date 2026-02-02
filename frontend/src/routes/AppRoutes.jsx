import React from 'react'
import { BrowserRouter as Router  , Route , Routes } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/FoodPartnerRegister'
import PartnerLogin from '../pages/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import Saved from "../pages/general/Saved";


const AppRoutes = () => {
  return (
      <Router>
        <Routes>
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<PartnerRegister />} />
            <Route path="/food-partner/login" element={<PartnerLogin />} />
            <Route path="/food-partner/:id" element={<Profile />} />
            <Route path="*" element={<div style={{padding:40}}>Open <code>/user/register</code> or <code>/food-partner/login</code> or <code>/food-partner/profile</code></div>} />
            <Route path="/" element={<Home />} />
            <Route path="/create-food" element={<CreateFood />}/>
            <Route path="/saved" element={<Saved />} />

        </Routes>
      </Router>   
  )
}

export default AppRoutes
