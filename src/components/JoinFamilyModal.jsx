import React, { useState } from "react";
import api from "../api";

export default function JoinFamilyModal({ onClose, onJoin }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post(
        "/family/join",
        { referralCode: code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onJoin(data);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to join family");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Join Family</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            placeholder="Referral Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Joining..." : "Join"}
          </button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        <button className="close-modal-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
