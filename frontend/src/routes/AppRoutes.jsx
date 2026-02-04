import { Route, Routes, Navigate } from "react-router-dom";

import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import PartnerRegister from "../pages/FoodPartnerRegister";
import PartnerLogin from "../pages/FoodPartnerLogin";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";
import Saved from "../pages/general/Saved";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/user/register" replace />} />

     
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<PartnerRegister />} />
      <Route path="/food-partner/login" element={<PartnerLogin />} />

      
      <Route path="/reels" element={<Home />} />

      <Route path="/create-food" element={<CreateFood />} />
      <Route path="/food-partner/:id" element={<Profile />} />
      <Route path="/saved" element={<Saved />} />

    </Routes>
  );
};

export default AppRoutes;
