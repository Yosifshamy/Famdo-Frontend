import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../auth";

export default function Nav() {
  const navigate = useNavigate();
  const user = getUser();
  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/">
          <h1>Famdo</h1>
        </Link>
      </div>
      <ul className="nav-links">
        {user ? (
          <>
            <li>
              <Link to="/todos">
                <i className="fas fa-tasks"></i>
                <span>Personal</span>
              </Link>
            </li>
            <li>
              <Link to="/family">
                <i className="fas fa-users"></i>
                <span>Family</span>
              </Link>
            </li>
            <li>
              <button onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <i className="fas fa-user-plus"></i>
                <span>Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
