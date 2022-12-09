import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClassSearchPage from "./pages/ClassSearchPage";
import ClassDetailsPage from "./pages/ClassDetailsPage";
import GroupDetailsPage from "./pages/GroupDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AboutUsPage from "./pages/AboutUsPage";
import { AuthProvider } from "./context/AuthContext";
import AuthButton from "./components/AuthButton";

import "./App.css";
import PrivateRouteRequiresAuth from "./components/PrivateRouteRequiresAuth";

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Study Buddies
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/class-search">
              Class Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/login">
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/sign-up">
              Sign Up
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about-us">
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
      <AuthButton />
    </nav>
  );
}


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <div className="container-xl text-center">
          <div className="row justify-content-center">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route
                path="/posts/new"
                element={
                  <PrivateRouteRequiresAuth>
                    {/* In react-router v6 we protect routes like this */}
                    <ProfilePage />
                  </PrivateRouteRequiresAuth>
                }
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/class-search" element={<ClassSearchPage />} />
              <Route path="/classes/:id" element={<ClassDetailsPage />} />

              <Route path="/groups/:id" element={<GroupDetailsPage />} />

              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// testing comments down here