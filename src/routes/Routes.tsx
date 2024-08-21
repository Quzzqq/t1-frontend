import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Register from "../pages/Home/Register/Register";
import Login from "../pages/Home/Login/Login";
import Header from "../components/Header/Header";
import Profile from "../pages/Profile/Profile";

export default function () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/registration" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user/:id" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
