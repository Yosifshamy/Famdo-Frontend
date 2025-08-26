import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveAuth } from "../auth";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        saveAuth({ token, user });
        navigate("/dashboard");
      } catch (error) {
        console.error("Error parsing auth callback:", error);
        navigate("/login?error=auth_failed");
      }
    } else {
      navigate("/login?error=auth_failed");
    }
  }, [navigate, searchParams]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>Processing login...</div>
    </div>
  );
}
