import React, { useState } from "react";
import api from "../api";

export default function CreateFamilyModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post(
        "/family/create",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onCreate(data);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to create family");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create Family</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            placeholder="Family Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
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
