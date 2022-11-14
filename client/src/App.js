import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClassSearchPage from "./pages/ClassSearchPage";
import MyClassesPage from "./pages/MyClassesPage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import AboutUsPage from "./pages/AboutUsPage";
import { AuthProvider } from "./context/AuthContext";
import AuthButton from "./components/AuthButton";

import PostsListPage from "./pages/PostsListPage";
import PostFormPage from "./pages/PostFormPage";
import ShowPostPage from "./pages/ShowPostPage";

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
            <NavLink className="nav-link" to="/my-classes">
              My Classes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/friends">
              Friends
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
          <li className="nav-item">
            <NavLink className="nav-link" to="/about-us">
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/all-posts">
              View All Posts (Test)
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/posts/new">
              New Post (Test)
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
              <Route
                path="/posts/new"
                element={
                  <PrivateRouteRequiresAuth>
                    {/* In react-router v6 we protect routes like this */}
                    <PostFormPage />
                  </PrivateRouteRequiresAuth>
                }
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/class-search" element={<ClassSearchPage />} />
              <Route path="/my-classes" element={<MyClassesPage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/posts/:id" element={<ShowPostPage />} />
              <Route path="/all-posts" element={<PostsListPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;