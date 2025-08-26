// Replace the ENTIRE content with this:
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "../auth";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthed());
      setLoading(false);
    };

    // Small delay to ensure auth state is loaded
    setTimeout(checkAuth, 100);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
