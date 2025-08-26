// Replace the ENTIRE content with this:
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "../auth";

export default function RootRedirect() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Give a moment for auth state to initialize
    const checkAuth = () => {
      setAuthenticated(isAuthed());
      setLoading(false);
    };
    
    // Small delay to ensure auth state is loaded
    setTimeout(checkAuth, 100);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return authenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}