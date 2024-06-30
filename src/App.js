import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./Components/Login/Login";
import UserManagementPage from "./Components/admin/View/UserManagement";
import ProfilePage from "./Components/view/Profile/Profile";
import Register from "./Components/view/Register/Register";
import Header from "./Components/view/partials/HomePage/Header";
import Home from "./Components/view/partials/HomePage/Home";
import PostCreate from "./Components/view/partials/PostNews/PostCreate";
import ForgetPassword from "./Components/view/partials/ResetPassword/ForgetPassword";
import OTPVerification from "./Components/view/partials/ResetPassword/OTPVerification";
import ResetPassword from "./Components/view/partials/ResetPassword/ResetPassword";
import "./transitions.css";
import ChatPage from "./Components/view/Chat/Chat";

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [showHeader, setShowHeader] = useState(true); // State to control header visibility

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {showHeader && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}{" "}
      {/* Conditional rendering of Header */}
      <ToastContainer position="top-right" autoClose={3000} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/post-create" element={<PostCreate />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                isLoggedIn ? (
                  <UserManagementPage
                    isLoggedIn={isLoggedIn}
                    setShowHeader={setShowHeader}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
